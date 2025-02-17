import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RequestService } from '../../services/request.service';
import { parse } from 'date-fns';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { CommumFunctionsService } from 'src/app/services/commum-functions.service';
import { co } from '@fullcalendar/core/internal-common';

export interface ApprovedBook {
  category: string,
  titleBook: string,
  vendor: string,
  equipment: string,
  status: string,
  updateAt: string
}

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})

export class BookListComponent implements AfterViewInit{

  displayedColumns: string[] = ['category',  'titleBook', 'vendor', 'equipment', 'sap', 'status', 'end_date', 'button'];
  dataSource = new MatTableDataSource<ApprovedBook>([])
  originalData: ApprovedBook[] = []

  route = ''

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('input') inputElement!: ElementRef;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(
    private requestService: RequestService,
    private router: Router,
    public commumService: CommumFunctionsService
    
    ) {}

  async ngAfterViewInit() {
    let response = await this.requestService.getRequest('portal')
    this.dataSource.data = response.data
    this.originalData = this.dataSource.data.slice()
    this.dataSource.paginator = this.paginator
    
    
    const filterValue = sessionStorage.getItem('filter');
    const filterRoute = sessionStorage.getItem('route');
    const scrollValue = sessionStorage.getItem('scroll');
    

    const storedPageIndex = sessionStorage.getItem('pageIndex');
    const storedPageSize = sessionStorage.getItem('pageSize');

    const pageIndex = storedPageIndex ? parseInt(storedPageIndex, 10) : 0;
    const pageSize = storedPageSize ? parseInt(storedPageSize, 10) : 5;

    if (filterValue) {
      // this.dataSource.filterPredicate = (data: ApprovedBook, filterValue: string) => {
      //   let filterRegex = new RegExp(`\\b${filterValue}\\b`,"i");
      //   return filterRegex.test(data.category) || filterRegex.test(data.status) || filterRegex.test(data.vendor) || filterRegex.test(data.equipment) || filterRegex.test(data.titleBook); 
      // }
      this.inputElement.nativeElement.value = filterValue;
      this.commumService.applyFilterbyString(filterValue, this.dataSource);
    }

    if(scrollValue != null){
      this.scrollContainer.nativeElement.scrollTop = Number(scrollValue)
    }

    if(pageIndex != null && pageSize != null){
      this.dataSource.paginator.pageIndex = Number(pageIndex)
      this.dataSource.paginator.pageSize = Number(pageSize)
    }

    this.paginator._changePageSize(pageSize);


    this.paginator.page.subscribe(event => {
      sessionStorage.setItem('pageIndex', event.pageIndex.toString());
      sessionStorage.setItem('pageSize', event.pageSize.toString());
    });
  }

  onScroll() {
    const scrollTop = this.scrollContainer.nativeElement.scrollTop;
    sessionStorage.setItem('scroll', scrollTop.toString());
  }

  
  
  async createPDF(book_id: number, model_id: number, version_id: number) {
    let returnedObj: any

    returnedObj = await this.requestService.postRequest('createPDF',
      {
        book_id: book_id,
        model_id: model_id ,
        version_id: version_id
      })

    window.open(`${this.requestService.SERVER_URL}pdf/${returnedObj.data.id}`)
  }

  async createExcel() {
    let searchName = sessionStorage.getItem('filter');
    let returnedSheet = await this.requestService.getXlRequest(`xl?search=${searchName}`);
    let content = returnedSheet.headers.get("Content-Disposition");
    console.log(content)
    this.download(returnedSheet.data, searchName, '.xlsx');
    
  }

  download(data: any, filename: any, type: string) {
    const file = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const a = document.createElement("a");
    const url = window.URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navigate(id: number) {
    this.router.navigate([`comparative/${id}`])
  }

  navigateToDevice(id: number) {
    this.router.navigate([`device/${id}`])
  }

  sortData(sort: Sort) {
    const isAsc = sort.direction === 'asc'
    let dateA: Date | null = null
    let dateB: Date | null = null
    let auxiliaryData = this.originalData.slice()
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = auxiliaryData
      return
    }
    this.dataSource.data = auxiliaryData.sort((a: any, b: any) => {
      
      switch (sort.active) {
        case 'titleBook':
          return this.compare(a.titleBook, b.titleBook, isAsc)
        case 'category':
          return this.compare(a.category, b.category, isAsc)
        case 'equipment':
          return this.compare(a.name, b.name, isAsc)
        case 'vendor':
          return this.compare(a.vendor, b.vendor, isAsc)
        case 'end_date':
          dateA = this.stringToDate(a.end_date) 
          dateB = this.stringToDate(b.end_date)
          return this.compare(dateA.getTime(), dateB.getTime(), isAsc)
        case 'status':
          return this.compare(a.status, b.status, isAsc)
        default: 
          return 0
      }
    })
  }

  stringToDate(dateString: string): Date {
    const format = 'dd/MM/yyyy'
    let formattedDate = parse(dateString, format, new Date())
    return formattedDate

  }

  compare(a: any, b: any, isAsc: boolean) {
    let result = 1
    if(a == b) {
      result = 0
    } else if(a < b) {
      result = -1
    }
    return result * (isAsc ? 1 : -1)
  }
}

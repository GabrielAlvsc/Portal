import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RequestService } from '../../services/request.service';
import { parse } from 'date-fns';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

export interface ApprovedBook {
  category: string,
  titleBook: string,
  vendor: string,
  equipment: string
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements AfterViewInit {

  url: string = window.location.href
  urlPaths = this.url.split('/')

  displayedColumns: string[] = ['category',  'titleBook', 'vendor', 'equipment'];
  dataSource = new MatTableDataSource<ApprovedBook>([])
  originalData: ApprovedBook[] = []

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private requestService: RequestService,
    private router: Router,
    public dialogRef: MatDialogRef<DialogComponent>
    ) {}

  async ngAfterViewInit() {
    let response = await this.requestService.getRequest('portal')
    this.dataSource.data = response.data
    this.dataSource.paginator = this.paginator
    this.originalData = this.dataSource.data.slice()
  }

  applyFilter(event: Event) { 
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navigate(id: number) {
    this.router.navigate([`comparative/${this.urlPaths[4]}-${id}`])
    this.dialogRef.close()
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

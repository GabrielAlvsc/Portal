
import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { RequestService } from 'src/app/services/request.service';
import { format, parse } from 'date-fns';

export interface DeviceBook{
  name: string
  vendor: string 
  price: number
  endofsales: string
  model_id: number
  version_id: number
  book_id: number
}

@Component({
  selector: 'app-equip-book-list',
  templateUrl: './equip-book-list.component.html',
  styleUrls: ['./equip-book-list.component.css']
})

export class EquipBookListComponent {
  constructor(
    private router: Router,
    private requestService: RequestService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Tabela
  displayedColumns: string[] = ['category', 'model', 'version', 'status', 'date', 'button'];
  dataSource: MatTableDataSource<DeviceBook> = new MatTableDataSource<DeviceBook>([]);

  //Referente ao Sort
  originalData: DeviceBook[] = []

  //Parametros da URL
  url: string = window.location.href
  urlParameters = this.url.split('/')
  equipamentID = this.urlParameters[4]

  //Labels
  equipmentTitle: string = ''
  equipmentSap: string = ''
  equipmentVendor: string = ''

  //Referente as Imagens
  imagePath: string = ''

  async ngAfterViewInit() {
    let response: any;
    response = await this.requestService.getRequest(`deviceBooks/${this.equipamentID}`);
    
    this.dataSource.data = response.data.books
    this.dataSource.paginator = this.paginator;

    //Inserir nome do equipamento no Titulo da página
    this.equipmentTitle = response.data.name
    this.equipmentSap = response.data.sap
    this.equipmentVendor = response.data.vendor
    
    //Pegando o caminho da Imagem do equipamento
    this.imagePath = response.data.image

    //Colocando os Registros dentro de uma lista(usado para o sort)
    this.originalData = this.dataSource.data.slice()
  }

  goBack(){
    history.back() 
  }

  async createPDF(book_id: number | string | null, model_id: number | string, version_id: number | string) {
    let returnedObj: any

    returnedObj = await this.requestService.postRequest('createPDF',
      {
        book_id: book_id,
        model_id: model_id,
        version_id: version_id
      })

    window.open(`${this.requestService.SERVER_URL}pdf/${returnedObj.data.id}`)
  }

  applyFilter(event: Event, dataSource: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.filter = filterValue.trim().toLowerCase();
  }

  //Ordena os dados da tabela na ordem selecionada
  sortData(sort: Sort, toSortList: any, dataSource: any) {
    const isAsc = sort.direction === 'asc'
    let dateA: Date | null = null
    let dateB: Date | null = null
    let auxiliaryData = toSortList.slice()

    if (!sort.active || sort.direction === '') {
      dataSource.data = auxiliaryData
      return
    }

    dataSource.data = auxiliaryData.sort((a: any, b: any) => {

      switch (typeof a[sort.active]) {
        case 'string':
          if (a[sort.active].includes('/')) {
            if (a[sort.active] == null) {
              if (b[sort.active] == null) {
                return 0 * (isAsc ? 1 : -1)
              } else {
                return -1 * (isAsc ? 1 : -1)
              }
            }
            if (b[sort.active] == null) {
              return 1 * (isAsc ? 1 : -1)
            }
            dateA = this.stringToDate(a[sort.active])
            dateB = this.stringToDate(b[sort.active])
            return this.compare(dateA.getTime(), dateB.getTime(), isAsc)
          } else {
            return this.compare(a[sort.active], b[sort.active], isAsc)
          }
        case 'number':
          return this.compare(a[sort.active], b[sort.active], isAsc)
        default:
          return 0
      }
    })
  }

  //Compara os dados para ordernar de forma crescente ou descrecente
  compare(a: any, b: any, isAsc: boolean) {
    let result = 1
    if (a == b) {
      result = 0
    } else if (a < b) {
      result = -1
    }
    return result * (isAsc ? 1 : -1)
  }

  //Converte data do tipo String para Date
  stringToDate(dateString: string) {
    const format = 'dd/MM/yyyy'
    let formattedDate = parse(dateString, format, new Date())
    return formattedDate
  }

  navigateToComparative(bookId: number){
    this.router.navigate([`comparative/${bookId}`])
  }
}

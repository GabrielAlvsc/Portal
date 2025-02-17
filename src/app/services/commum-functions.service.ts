import { ElementRef, Injectable, ViewChild } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommumFunctionsService {

  constructor() { }

    //Aplica filtro nas tabelas
    applyFilter(event: Event, dataSource: any, route: string = '') {
      const filterValue = (event.target as HTMLInputElement).value;
      // dataSource.filterPredicate = (data: any, filterValue: string) => {
      //   let filterRegex = new RegExp(`\\b${filterValue}\\b`,"i");
      //   return filterRegex.test(data.category) || filterRegex.test(data.status) || filterRegex.test(data.vendor) || filterRegex.test(data.equipment) || filterRegex.test(data.titleBook); 
      // }
      sessionStorage.setItem('filter', filterValue)
      sessionStorage.setItem('route', route)
      dataSource.filter = filterValue.trim().toLowerCase();
      
  
      if (dataSource.paginator) {
        dataSource.paginator.firstPage();
      }
    }
  
    applyFilterbyString(input: string, dataSource: any, route: string = '') {
      dataSource.filter = input.trim().toLowerCase();
      sessionStorage.setItem('route', route)
      if (dataSource.paginator) {
        dataSource.paginator.firstPage();
      }
    }
  
    @ViewChild('input') inputElement!: ElementRef;
    defineFilter(route: string, dataSource: any){
      const filterValue = sessionStorage.getItem('filter');
      const filterRoute = sessionStorage.getItem('route');
  
      if (filterValue && route == filterRoute) {
        this.inputElement.nativeElement.value = filterValue;
        this.applyFilterbyString(filterValue, dataSource);
      }
      else{
        sessionStorage.clear()
      }
    }
}

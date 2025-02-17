import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';
import { s } from '@fullcalendar/core/internal-common';

export class StaticTable {
  name: string = ''
  value: string = ''
}

export class Equipment {
  [k: string]: any
  name: string = ''
  vendor: string = ''
  model: string = ''
  status: string = ''
  imagePath: string = ''
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  equipment = new Equipment()

  equipmentList: Equipment[] = []

  listStaticTable: StaticTable[] = [
    {
      name: 'Caderno de Testes',
      value: `model`
    },
    {
      name: 'Fabricante',
      value: 'vendor'
    },
    {
      name: 'Equipamento',
      value: 'name'
    },
    {
      name: 'Código SAP',
      value: 'sap'
    },
    {
      name: 'Status Homologação',
      value: 'status'
    }
  ]

  constructor(
    private requestService: RequestService,
    private router: Router
  ) {

  }

  async ngOnInit() {
    const response = await this.requestService.getRequest('recentBooks')
    let allBooks = response.data
    for(let book of allBooks) {
      let staticFeatures = book.statics

      this.equipment = {
        id: staticFeatures.equipment_id,
        name: staticFeatures.equipment,
        vendor: staticFeatures.vendor,
        model: staticFeatures.model,
        sap: staticFeatures.sap,
        status: staticFeatures.status,
        imagePath: staticFeatures.image
      }
  
      this.equipmentList.push(this.equipment)
    }
  }

  navigateToDevice(id: number){
    this.router.navigate([`device/${id}`])
  }
}

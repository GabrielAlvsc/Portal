import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { ActivatedRoute, NavigationEnd, NavigationStart, ParamMap, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Observable, ObservableInput, switchMap } from 'rxjs';
import { ValidatorService } from 'src/app/services/validator.service';

export class Equipment {
  [k: string]: any
  bookId: number | null = null
  equipmentId: number | null = null
  name: string = ''
  vendor: string = ''
  sap: string = ''
  price: string = ''
  endOfSales: number | null = null
  modelWithVersion: string = ''
  category: string = ''
  status: string = ''
  certifiedAt: string = ''
  features: { [name: string]: string } = {}
  items: { [title: string]: boolean } = {}
  imagePath: string = ''
}

export class StaticTable {
  name: string = ''
  value: string = ''
}

@Component({
  selector: 'app-comparative',
  templateUrl: './comparative.component.html',
  styleUrls: ['./comparative.component.css']
})
export class ComparativeComponent implements OnInit {

  bookComparative: any

  equipment = new Equipment()

  equipmentList: Equipment[] = []

  allFeatures = new Set<string>()

  featuresMatrix: any[][] = []

  itemsMatrix: any[][] = []

  allItems = new Set<string>()

  listStaticTable: StaticTable[] = [
    {
      name: 'Categoria',
      value: 'category'
    },
    {
      name: 'Caderno de Testes',
      value: `modelWithVersion`
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
    },
    {
      name: 'Última Atualização',
      value: 'certifiedAt'
    },
    {
      name: 'End Of Sales',
      value: 'endOfSales'
    },
    {
      name: 'Preço de referência',
      value: 'price'
    }
  ]

  constructor(
    private requestService: RequestService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private validatorService: ValidatorService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      routeParams => {
        this.equipmentList = []
        this.allFeatures.clear()
        this.allItems.clear()
        this.addEquipmentsByIds(routeParams)
      }
    )
  }

  async addEquipmentsByIds(routeParams: any) {
    let bookIdList = routeParams.id.split('-')
    for (let i = 0; i < bookIdList.length; i++) {
      await this.addEquipment(bookIdList[i])
    }
  }

  async addEquipment(id: string) {
    this.equipment = new Equipment()
    let response = await this.requestService.getRequest(`portal/book/${id}`)

    let staticData = response.data.statics
    let features = response.data.features
    let testItems = response.data.testResume

    this.equipment.bookId = Number(id)
    this.equipment.equipmentId = staticData.equipment_id
    this.equipment.name = staticData.equipment
    this.equipment.vendor = staticData.vendor
    this.equipment.sap = staticData.equipment_sap
    this.equipment.price = `U$ ${staticData.price}`
    this.equipment.endOfSales = staticData.endOfSales
    this.equipment.imagePath = staticData.image
    this.equipment.category = staticData.category
    this.equipment.certifiedAt = staticData.certifiedDate
    this.equipment.status = staticData.status
    this.equipment.modelWithVersion = `${staticData.model} - Versão ${staticData.modelVersion}`

    this.equipment.features = features
    this.equipment.items = testItems

    Object.keys(features).forEach(feature => {
      this.allFeatures.add(feature)
    });

    Object.keys(testItems).forEach(item =>{
      this.allItems.add(item)
    })
    
    this.equipmentList.push(this.equipment)

    this.compare()
  }

  compare() {
    let lineFeatures: any[]
    let lineItems: any[]
    this.featuresMatrix = []
    this.itemsMatrix = []
    for (let feature of this.allFeatures) {
      lineFeatures = []
      for (let equipment of this.equipmentList) {
        lineFeatures.push(equipment.features[feature] || '-')
      }
      this.featuresMatrix.push(lineFeatures)
    }

    for (let item of this.allItems) {
      lineItems = []
      for (let equipment of this.equipmentList) {
        lineItems.push(equipment.items[item] || '-')
      }
      this.itemsMatrix.push(lineItems)
    }
  }

  deleteEquipment(id: any) {
    let fullPath = this.activatedRoute.snapshot.paramMap.get('id')
    let newPath: any
    let pathIdList = fullPath?.split('-')
    for (let index in pathIdList!) {
      if (pathIdList[index] == id) {
        pathIdList.splice(Number(index), 1)
      }
    }
    newPath = pathIdList?.join('-')
    this.router.navigate([`comparative/${newPath}`])
  }

  openSelect() {
    this.validatorService.openDialog('0ms', '0ms')
  }

  goBack() {
    this.router.navigate(['bookList'])
  }

  navigateToDevice(id: number | null) {
    this.router.navigate([`device/${id}`])
  }
}

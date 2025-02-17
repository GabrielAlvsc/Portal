import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RequestService } from '../../../services/request.service';

@Component({
  selector: 'app-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.css']
})
export class ChartContainerComponent {
  constructor(
    private requestService: RequestService,
    private fb: FormBuilder
  ) {this.setColorScheme();}

  //Parametros da URL
  url: string = window.location.href;
  urlParameters = this.url.split("/");

  colorScheme: any;
  setColorScheme() {
  this.colorScheme = {
    domain: 
      [
      //Aprovado - Reprovado - Revogado - Suspenso - Pendente - Cancelado
      '#03C988', '#FF204E', '#FFB400', '#8644A2', '#2994B2','#474744'
      ]
    };
  }

  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Categorias';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Total';
  animations: boolean = true;

  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = false;

  viewGrid: [number, number] = [1200, 400];

  chartData: any[] = []
  chartDataByCategory: any[] = []
  chartDataByBooks: any[] = []
  chartDataByModelsAll: any[] = []
  chartDataByModelsSliced: any[] = []
  chartDataByExecution: any[] = []

  users: any[] = []
  user_id: number = 0
  minDate!: Date
  searchForm!: FormGroup

  chartInExibition: string = 'category'

  createForm() {
    this.searchForm = this.fb.group({
    startDate: new FormControl('', []),
    endDate: new FormControl('', []),
    })
  }

  ngOnInit(){
    this.createForm()
  }

  async ngAfterViewInit() {
    let response: any

    //Gráficos:
    response = await this.requestService.getRequest('charts/byCategory')
    this.chartData = response.data

    response = await this.requestService.getRequest('charts/byBookInExecution')
    this.chartDataByExecution = response.data

    response = await this.requestService.getRequest('charts/byModel')
    this.chartDataByModelsAll = response.data
    this.chartDataByModelsSliced = this.chartDataByModelsAll

    response = await this.requestService.getRequest('charts/byBook')
    this.chartDataByBooks = response.data
  }

  onSelect(event: any) {
    console.log(event);
  }

  async searchFunction(){
    let result: any
    let startDate = new Date(this.searchForm.get('startDate')!.value).getTime()
    let endDate = new Date(this.searchForm.get('endDate')!.value).getTime()

    this.chartDataByCategory = []

    if(startDate <= endDate){
      result = await this.requestService.getRequest(`charts/byCategory?start=${startDate}&end=${endDate}`)
    } else {
      result = await this.requestService.getRequest(`charts/byCategory?start=${startDate}`)
    }

    this.chartData = result.data
  }

  filterItems(event: Event){
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.chartDataByModelsSliced = this.chartDataByModelsAll.filter(obj => obj.name.toLowerCase().includes(filterValue));
  }

  switchChart(chartName: string){
    this.chartInExibition = chartName
  }
}

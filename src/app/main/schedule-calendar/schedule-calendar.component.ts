import { RequestService } from '../../services/request.service';
import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.css']
})


export class ScheduleCalendarComponent {

  constructor(
    private requestService: RequestService,
    private validatorService: ValidatorService
  ){}

  colors =  
    [
      { "picked": false, "hex": "#38E54D" },
      { "picked": false, "hex": "#FF0000" },
      { "picked": false, "hex": "#FFB400" },
      { "picked": false, "hex": "#8644A2" },
      { "picked": false, "hex": "#2994B2" },
      { "picked": false, "hex": "#474744" },
      { "picked": false, "hex": "#F7C566" },
      { "picked": false, "hex": "#070F2B" },
      { "picked": false, "hex": "#8576FF" },
      { "picked": false, "hex": "#C40C0C" },
      { "picked": false, "hex": "#FF204E" },
      { "picked": false, "hex": "#FF6500" },
    ]

  events = [{}]
  currentDate = new Date();
  startDate = new Date(this.currentDate.getTime() - (185 * 24 * 60 * 60 * 1000));
  endDate = new Date(this.currentDate.getTime() + (185 * 24 * 60 * 60 * 1000));
  books: any

  async openDialog(info: any){
    let ret = this.books[info.event._def.publicId]
    let start = new Date(ret.start_date)
    let formatedStart = this.formatDate(start)
    let end = new Date(ret.end_date)
    let formatedEnd = this.formatDate(end)

    let eventInfo = {
      "title": ret.version.model.title,
      "vendor": ret.equipament.vendor,
      "equipment": ret.equipament.name,
      "startDate": formatedStart,
      "endDate": formatedEnd,
      "userExecutor": ret.user_executor.name,
      "userResponsible": ret.user_responsible.name,
      "color": info.event._def.ui.backgroundColor,
      "status": ret.status
    }

    this.validatorService.openCalendarDialog('0ms','0ms', eventInfo)
  }

  
  formatDate(data: Date): string {
    const dia = data.getDate();
    const mes = data.getMonth() + 1; 
    const ano = data.getFullYear();
  
    const diaFormatado = dia < 10 ? '0' + dia : dia;
    const mesFormatado = mes < 10 ? '0' + mes : mes;
  
    return `${diaFormatado}/${mesFormatado}/${ano}`;
  }

  monthView: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    weekends: false,
    locale: 'pt-br',
    events: [],
    
    eventClick: this.openDialog.bind(this),

    headerToolbar: {
      start: '',
      center: 'title',
      end: 'today prev next'
    },

    buttonText: {
      today: 'Hoje',
    },
  };

  async ngOnInit(){
    let result: any
    let formatedStartDate = this.formatDate(this.startDate)
    let formatedEndDate = this.formatDate(this.endDate)

    result = await this.requestService.getRequest('booksByDate/' + formatedStartDate + '/to/' + formatedEndDate);
    this.books = result.data

    for (let index = 0; index < this.books.length; index++) {
      const element = result.data[index];

      this.events.push({title: element.version.model.title, 
                        id: index,
                        color: this.defineColors(index),
                        start: element.start_date.split('T')[0],
                        end: element.calendar_end_date.split('T')[0]})
    }

    this.monthView.events = this.events
  }

  defineColors(index: number){
    if (index >= 10){
      index = index%10
    }
    return this.colors[index].hex
  }

}

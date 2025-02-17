import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-calendar-dialog',
  templateUrl: './calendar-dialog.component.html',
  styleUrls: ['./calendar-dialog.component.css']
})
export class CalendarDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, 
              private ref: MatDialogRef<CalendarDialogComponent>){}

  inputData: any

  title: string = ''
  vendor: string = ''
  equipment: string = ''
  startDate: string = ''
  endDate: string = ''
  userExecutor: string = ''
  userResponsible: string = ''
  color: string = ''
  status: string = ''

  ngOnInit(){
    this.inputData = this.data 
    this.title = this.inputData.title
    this.vendor = this.inputData.vendor
    this.equipment = this.inputData.equipment      
    this.startDate = this.inputData.startDate
    this.endDate = this.inputData.endDate
    this.userExecutor = this.inputData.userExecutor
    this.userResponsible = this.inputData.userResponsible
    this.color = this.inputData.color
    this.status = this.inputData.status
  }

  closePopup(){
    this.ref.close();
  }
}

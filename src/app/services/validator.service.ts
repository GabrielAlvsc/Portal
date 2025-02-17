import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DialogComponent } from '../template/dialog/dialog.component';
import { CalendarDialogComponent } from '../main/calendar-dialog/calendar-dialog.component';
import { CreateTicketsDialogComponent } from '../main/create-tickets-dialog/create-tickets-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar(message: string) {
    this.snackBar.open(message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    })
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(DialogComponent, {
      width: '800px',
      enterAnimationDuration,
      exitAnimationDuration
    })
  }

  openCalendarDialog(enterAnimationDuration: string, exitAnimationDuration: string, eventInfo: any){
    this.dialog.open(CalendarDialogComponent, {
      width: '30%',
      data: eventInfo,
      enterAnimationDuration,
      exitAnimationDuration
    })
  }

  dialogCreateTicket(enterAnimationDuration: string, exitAnimationDuration: string){
    this.dialog.open(CreateTicketsDialogComponent, {
      width: '600px',
      height: '500px',
      disableClose: true,
      enterAnimationDuration,
      exitAnimationDuration
    })
  }

  openSnackBarPositive(message: string) {
    this.snackBar.open(message, '✅', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 6000,
      panelClass: ['mat-primary']
    })
  }
}

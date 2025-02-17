import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './main/book-list/book-list.component';
import { HeaderComponent } from './template/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CustomPaginator } from './custom-paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { ComparativeComponent } from './main/comparative/comparative.component';
import { RouterModule } from '@angular/router';
import { DialogComponent } from './template/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SpinnerComponent } from './template/spinner/spinner.component';  
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ScheduleCalendarComponent } from './main/schedule-calendar/schedule-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarDialogComponent } from './main/calendar-dialog/calendar-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChartContainerComponent } from './main/charts/chart-container/chart-container.component';
import { HomeComponent } from './main/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomepageComponent } from './view/homepage/homepage.component';
import { NavComponent } from './template/nav/nav.component';
import { PageNFoundComponent } from './view/page-n-found/page-n-found.component';
import { EquipBookListComponent } from './main/equip-book-list/equip-book-list.component';
import { TeamPageComponent } from './main/team-page/team-page.component';
import { MatSelectModule } from '@angular/material/select';
import { FooterComponent } from './template/footer/footer.component';
import { CreateTicketsDialogComponent } from './main/create-tickets-dialog/create-tickets-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    HeaderComponent,
    ComparativeComponent,
    DialogComponent,
    SpinnerComponent,
    ScheduleCalendarComponent,
    CalendarDialogComponent,
    ChartContainerComponent,
    HomeComponent,
    LoginComponent,
    HomepageComponent,
    NavComponent,
    PageNFoundComponent,
    EquipBookListComponent,
    TeamPageComponent,
    FooterComponent,
    CreateTicketsDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSortModule,
    RouterModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FullCalendarModule,
    MatDividerModule,
    NgxChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  providers: [{provide: MatPaginatorIntl, useValue: CustomPaginator()}],
  bootstrap: [AppComponent]
})
export class AppModule { }

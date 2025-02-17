import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComparativeComponent } from './main/comparative/comparative.component';
import { ScheduleCalendarComponent } from './main/schedule-calendar/schedule-calendar.component';
import { ChartContainerComponent } from './main/charts/chart-container/chart-container.component';
import { BookListComponent } from './main/book-list/book-list.component';
import { HomeComponent } from './main/home/home.component';
import { HomepageComponent } from './view/homepage/homepage.component';
import { PageNFoundComponent } from './view/page-n-found/page-n-found.component';
import { EquipBookListComponent } from './main/equip-book-list/equip-book-list.component';
import { TeamPageComponent } from './main/team-page/team-page.component';
import { LoginComponent } from './view/login/login.component';
import { NotAuthUserService } from './services/guards/not-auth-user.service';
import { AuthUserService } from './services/guards/auth-user.service';

const routes: Routes = [
  {
    path: "",
    // redirectTo: "login", 
    redirectTo: "home", 
    pathMatch: "full"
  },
  // {
  //   path: "login",
  //   component: LoginComponent, canActivate: [NotAuthUserService],
  // },
  {
    path: "home",
    component: HomepageComponent, 
    // canActivate: [AuthUserService],
    children: [
      { path: '', component: HomeComponent }
    ],
  },
  {
    path: "bookList", 
    // canActivate: [AuthUserService],
    component: HomepageComponent,
    children: [
      { path: '', component: BookListComponent }
    ]
  },
  {
    path: "team", 
    // canActivate: [AuthUserService],
    component: HomepageComponent,
    children: [
      { path: '', component: TeamPageComponent }
    ]
  },
  {
    path: "device", 
    // canActivate: [AuthUserService],
    component: HomepageComponent,
    children: [
      { path: ':id', component: EquipBookListComponent },
    ]
  },
  {
    path: "comparative/:id", 
    // canActivate: [AuthUserService],
    component: HomepageComponent,
    children: [
      { path: '', component: ComparativeComponent }
    ]
  },
  {
    path: "schedule", 
    // canActivate: [AuthUserService],
    component: HomepageComponent,
    children: [
      { path: '', component: ScheduleCalendarComponent }
    ]
  },
  {
    path: "charts", 
    // canActivate: [AuthUserService],
    component: HomepageComponent,
    children: [
      {
        path: '',
        component: ChartContainerComponent
      },
    ]
  },
  {
    path: "**",
    component: PageNFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

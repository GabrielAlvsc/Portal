import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private request: RequestService,
    private validator: ValidatorService
  )
  {}

  url: string = window.location.href
  urlSplit = this.url.split('/') 

  host = this.urlSplit[1]

  version: string | null = ''
  user: string | null = ''

  isCDTUser: boolean = true
  //false

  async ngOnInit(){
    this.user = localStorage.getItem('name')
    this.version = localStorage.getItem('version')

    // this.isCDTUser = (localStorage.getItem('profile') == 'cdt')
    
    if (this.version == undefined || this.version == '' || this.version == null) {
      let ret = await this.request.getRequest('systemVersion')
      localStorage.setItem('version',`P${ret.data.portal}`)
    }
  }

  gotoCalendar(){
    this.router.navigate(['schedule'])
  }

  gotoBookList(){
    this.router.navigate(['bookList'])
  }

  goToHome(){
    this.router.navigate(['home'])
  }

  gotoTeam(){
    this.router.navigate(['team'])
  }

  gotoBooks(){
    window.open(`${this.host}/admin/login`)
  }

  gotoCharts(){
    this.router.navigate(['charts'])
  }

  gotoTickets(){
    this.validator.dialogCreateTicket('0ms','0ms')
  }

  logout(){
    this.request.logout();
  }
}

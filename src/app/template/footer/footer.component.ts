import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(
    private router: Router,
    private request: RequestService
  )
  {}

  version: string | null = ''

  async ngOnInit(){
    this.version = localStorage.getItem('version')

    if (this.version == undefined || this.version == '' || this.version == null) {
      let ret = await this.request.getRequest('systemVersion')
      localStorage.setItem('version',`P${ret.data.portal}`)
    }
  }
}

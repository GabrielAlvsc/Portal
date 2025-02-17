import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  valueSpinner: any

  constructor(
    private request: RequestService) {
      this.request.observable.subscribe((newValue) => {
        this.valueSpinner = newValue
      })
    }
}

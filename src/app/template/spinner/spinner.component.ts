import { Component } from '@angular/core';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {

  valueSpinner: any
  
  constructor(
    private requestService: RequestService) {
      this.requestService.observable.subscribe((newValue) => {
        this.valueSpinner = newValue
      })
    }
}

import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  hide = true
  user = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor( 
    private requestService: RequestService
  ) {}

  login() {
    this.requestService.login(this.user, this.password)
  }
}
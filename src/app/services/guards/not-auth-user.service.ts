import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { RequestService } from '../request.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthUserService implements CanActivate{

  constructor(
    private requestService: RequestService,
    private router: Router
    ) { }
  
    canActivate(){
      if (this.requestService.logged()) {
        this.router.navigate(['home']);
        return false
      }
      return true;
    }
}

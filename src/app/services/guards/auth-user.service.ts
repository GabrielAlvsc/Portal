
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RequestService } from '../request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService implements CanActivate{

  constructor(
    private requestService: RequestService,
    private router: Router
    ) { }
  
    canActivate(){
      if (this.requestService.logged()) {
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }
    }
}

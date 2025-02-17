import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import axios from 'axios';
import { BehaviorSubject, Observable } from 'rxjs';
import { ValidatorService } from './validator.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  SERVER_URL: string = 'http://201.48.114.82/api/'

  private subject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  observable: Observable<boolean> = this.subject.asObservable()

  constructor(
    public dialog: MatDialog,
    private validator: ValidatorService,
    private router: Router,
  ) { }

  openSpinner() {
    this.subject.next(true)
  }

  closeSpinner() {
    this.subject.next(false)
  }

  async getRequest(route: string) {
    this.openSpinner()
    let response: any
    let url = this.SERVER_URL + route

    response = await axios.get(url, {
      headers: {
        'authorization': localStorage.getItem('token')
      }
    })
      .then((response) => {
        return response
      })
      .catch((error) => {
        if (error.response.status == 401) {
          this.logout()
        }
        this.errorMessagePopup(error.response.data.message)
        return error
      })
      .finally(
        () => {
          setTimeout(() => {
            this.closeSpinner()
          }, 400)
        }
      )
    return response
  }

  async getXlRequest(route: string) {
    this.openSpinner()
    let response: any
    let url = this.SERVER_URL + route

    response = await axios.get(url, {
      headers: {
        'authorization': localStorage.getItem('token')
      },
      responseType: 'blob'
    })
      .then((response) => {
        return response
      })
      .catch((error) => {
        if (error.response.status == 401) {
          this.logout()
        }
        this.errorMessagePopup(error.response.data.message)
        return error
      })
      .finally(
        () => {
          setTimeout(() => {
            this.closeSpinner()
          }, 400)
        }
      )
    return response
  }

  async postRequest(route: string, json: any) {
    let response: any
    let url = this.SERVER_URL + route
    response = await axios.post(url, json, 
      {      
      headers: {
      'authorization': localStorage.getItem('token')
    }})
      .then((response) => {
        return response
      })
      .catch((error) => {
        if (error.response.status == 401) {
          this.logout()
        }
        this.errorMessagePopup(error.response.data.message)
        return error
      })
    return response
  }

  errorMessagePopup(text: string){
    if(text != undefined){
      this.validator.openSnackBar(text)
    } else {
      this.validator.openSnackBar(
        'Não foi possivel se conectar ao servidor, verifique sua conexão com a internet e/ou o status do servidor.'
      ) 
    }
  }

  checkStatus(status: number): boolean{
    if(status == 201 || status == 200){
      return true
    } else {
      return false
    }
  }

  login(username: any, password: any) {
    axios.post(this.SERVER_URL + 'login', {
      username: username.value,
      password: password.value
    })
      .then((response) => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('profile', response.data.profile)
        localStorage.setItem('user', username.value)
        localStorage.setItem('name', response.data.name)
        this.router.navigate(['home'])
      })
      .catch((error) => {
        this.errorMessagePopup(error.response.data.message)
      })
  }

  logout() {
    //Apaga as informações do usuário do localStorage e redireciona para a tela de login
    localStorage.clear()
    this.router.navigate(['login'])
  }

  logged() {
    //Informa se o usuário está logado validando o campo token do localStorage
    return localStorage.getItem('token') ? true : false
  }
}

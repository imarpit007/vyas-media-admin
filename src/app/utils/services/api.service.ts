import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiHost: string;
  login: string;
  checkEmail: string;
  checkOTP: string;
  resetPsw: string;

  constructor(private http: HttpClient) {
    this.apiHost = environment.API_HOST;
    this.login = this.apiHost + `auth/login`;
    this.checkEmail = this.apiHost + `auth/forgetUserPassword`;
    this.checkOTP = this.apiHost + `auth/verifyOTPForgetUserPassword`;
    this.resetPsw = this.apiHost + `auth/forgetUserPasswordUpdate`;
  }

  onLogin(requestParameters : any) {
    return this.http.post(`${this.login}`, JSON.parse(requestParameters), {});
  }

  checkEmailForgotPsw(requestParameters : any) {
    return this.http.post(`${this.checkEmail}`, JSON.parse(requestParameters), {});
  }

  checkOTPForgotPsw(requestParameters : any) {
    return this.http.post(`${this.checkOTP}`, JSON.parse(requestParameters), {});
  }

  resetForgotPsw(requestParameters: any) {
    return this.http.post(`${this.resetPsw}`, JSON.parse(requestParameters), {});
  }

}

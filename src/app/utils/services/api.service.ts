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

  constructor(private http: HttpClient) {
    this.apiHost = environment.API_HOST;
    this.login = this.apiHost + `auth/login`;
  }

  onLogin(requestParameters : any) {
    return this.http.post(`${this.login}`, JSON.parse(requestParameters), {});
  }
}

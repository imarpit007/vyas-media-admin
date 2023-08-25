import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private router: Router) { }

  login(getLoginDetail : any) {
    localStorage.setItem('userInfo', JSON.stringify(getLoginDetail['userInfo']));
    localStorage.setItem('id', getLoginDetail.id);
    localStorage.setItem('email', getLoginDetail.email);
    localStorage.setItem('role', getLoginDetail.role);
    window.location.href = "/";
  }

  logout() {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    this.router.navigate(['/admin/login']);
  }
}

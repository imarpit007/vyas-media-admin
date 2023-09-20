import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AppService } from 'src/app/utils/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _appService: AppService,
    private _router: Router
  ) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkIfLoggedIn();
  }

  checkIfLoggedIn(): boolean {
    if (this._appService.loggedIn()) {
      return true;
    } else {
      this._router.navigate(['/admin/login']);
      return false;
    }
  }
  
}

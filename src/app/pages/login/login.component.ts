import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ApiService } from '../../utils/services/api.service';
import { AppService } from '../../utils/services/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: any =  FormGroup;
  public isAuthLoading = false;
  constructor(
    private renderer: Renderer2,
    private appService: AppService,
    private apiService: ApiService,
    private router: Router
  ){}

  ngOnInit() {
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  async login(){
    if (this.loginForm.valid) {
      const testBy = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let isValid = testBy.test(this.loginForm.get("email").value.toLowerCase());
      if(!isValid) {
        Swal.fire({
          text: 'Invalid Email Address',
          icon: 'error',
        });
        return false;
      }
      this.isAuthLoading = true;
      let loginData = {
        email: this.loginForm.get("email").value.toLowerCase(),
        password: this.loginForm.get("password").value
      };

      await this.apiService.onLogin(JSON.stringify(loginData)).subscribe((result: any) => {
        console.log(result);
          if (result.success) {
            this.isAuthLoading = false;
            Swal.fire({
              text: result.message,
              icon: 'success',
            });
            this.appService.login(result);
            this.router.navigate(['/admin/admin-panel']);
          } else {
            this.isAuthLoading = false;
            Swal.fire({
              text: result.message,
              icon: 'error',
            });
          }
      })
    } else {
      Swal.fire({
        text: 'Please enter email/password',
        icon: 'error',
      });
    }
    
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
  }

}

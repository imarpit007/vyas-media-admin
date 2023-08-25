import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ApiService } from '../../utils/services/api.service';
import { AppService } from '../../utils/services/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
        return false;
      }
      this.isAuthLoading = true;
      // let loginData = {
        //   email: "a@gmail.com",
        //   password: "123456"
        // }
      let loginData = {
        email: this.loginForm.get("email").value,
        password: this.loginForm.get("password").value
      };

      await this.apiService.onLogin(JSON.stringify(loginData)).subscribe((result: any) => {
        console.log(result);
          if (result.success) {
            this.isAuthLoading = false;
            this.appService.login(result);
          } else {
            this.isAuthLoading = false;
          }
      })
    } 
    // else {
    //   return false
    // }
    
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
  }

}

import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ApiService } from '../utils/services/api.service';
import { AppService } from '../utils/services/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // public isAuthLoading = false;
  constructor(
    private appService: AppService,
    private apiService: ApiService,
  ){}

  ngOnInit() {
  }

  login(){
    let loginData = {
      email: "a@gmail.com",
      password: "123456"
    }
    this.apiService.onLogin(JSON.stringify(loginData)).subscribe((result: any) => {
      console.log(result);
        if (result.success) {
          // this.isAuthLoading = false;
          this.appService.login(result);
        } else {
          // this.isAuthLoading = false;
        }
    })
  }

}

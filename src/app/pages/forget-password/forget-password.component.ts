import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ApiService } from '../../utils/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  public forgotPasswordForm: any = FormGroup;
  public isAuthLoading = false;
  public isEmailExist = false;
  public msg = 'Send OTP';

  constructor(
    private renderer: Renderer2,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      otp: new FormControl(null),
    });
  }

  async forgotPassword() {
    if (this.forgotPasswordForm.valid) {
      const testBy = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let isValid = testBy.test(this.forgotPasswordForm.get("email").value.toLowerCase());
      if (!isValid) {
        Swal.fire({
          text: 'Invalid Email Address',
          icon: 'error',
        });
        return false;
      }
      if(!this.isEmailExist) {
        this.isAuthLoading = true;
        let forgotPswData = {
          email: this.forgotPasswordForm.get("email").value.toLowerCase()
        };
        await this.apiService.checkEmailForgotPsw(JSON.stringify(forgotPswData)).subscribe((result: any) => {
          // console.log(result);
          if (result.success) {
            Swal.fire({
              text: result.message,
              icon: 'success',
            });
            this.isAuthLoading = false;
            this.isEmailExist = true;
            this.msg = 'Continue';
          } else {
            this.isAuthLoading = false;
            Swal.fire({
              text: result.message,
              icon: 'error',
            });
          }
        });
      } else {
        if(
          this.forgotPasswordForm.get("otp").value === null || 
          this.forgotPasswordForm.get("otp").value === undefined || 
          this.forgotPasswordForm.get("otp").value === ""
          ) {
            Swal.fire({
              text: 'Please Enter OTP',
              icon: 'error',
            });
          return false;
        }
        this.isAuthLoading = true;
        let forgotPswData = {
          email: this.forgotPasswordForm.get("email").value.toLowerCase(),
          otp: this.forgotPasswordForm.get("otp").value
        };
        await this.apiService.checkOTPForgotPsw(JSON.stringify(forgotPswData)).subscribe((result: any) => {
          // console.log(result);
          if (result.success) {
            this.isAuthLoading = false;
            localStorage.setItem('resetEmail', this.forgotPasswordForm.get("email").value.toLowerCase());
            Swal.fire({
              text: result.message,
              icon: 'success',
            });
            // this.router.navigate(['/admin/reset-password/' + this.forgotPasswordForm.get("email").value]);
            this.router.navigate(['/admin/reset-password/']);
          } else {
            this.isAuthLoading = false;
            Swal.fire({
              text: result.message,
              icon: 'error',
            });
          }
        });
      }
    } else {
      Swal.fire({
        text: 'Please Enter Email Address',
        icon: 'error',
      });
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
  }

}

import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ApiService } from '../../utils/services/api.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  public resetPswForm: any = FormGroup;
  public isAuthLoading = false;
  public getEmail: any;

  constructor(
    private renderer: Renderer2,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    this.resetPswForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      retypePassword: new FormControl(null, Validators.required),
    });
    // this.getEmail = this.route.snapshot.paramMap.get('emailAdd');
    this.getEmail = localStorage.getItem("resetEmail");
    this.resetPswForm.get("email").setValue(this.getEmail);
    this.resetPswForm.get("email").disable();
  }

  async resetPsw() {
    if (this.resetPswForm.valid) {
      const testBy = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let isValid = testBy.test(this.resetPswForm.get("email").value.toLowerCase());
      if(!isValid) {
        Swal.fire({
          text: "Invalid Email Address",
          icon: 'error',
        });
        return false;
      }
      if(this.resetPswForm.get("password").value != this.resetPswForm.get("retypePassword").value) {
        Swal.fire({
          text: "Password and confirm password should be same",
          icon: 'error',
        });
        return false;
      }
      this.isAuthLoading = true;
      let resetPswData = {
        email: this.getEmail,
        password: this.resetPswForm.get("password").value,
        confirm_password: this.resetPswForm.get("retypePassword").value
      };
      await this.apiService.resetForgotPsw(JSON.stringify(resetPswData)).subscribe((result: any) => {
        console.log(result);
        if (result.success) {
          this.isAuthLoading = false;
          Swal.fire({
            text: result.message,
            icon: 'success',
          });
          this.router.navigate(['admin/login']);
          localStorage.removeItem('resetEmail');
        } else {
          this.isAuthLoading = false;
          Swal.fire({
            text: result.message,
            icon: 'error',
          });
        }
      });
    } else {
      Swal.fire({
        text: 'Please Enter all the Fields',
        icon: 'error',
      });
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
  }

}

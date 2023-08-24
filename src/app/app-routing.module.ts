import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: 'admin/forget-password', component: ForgetPasswordComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: '**', redirectTo: '',},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ForgetPasswordComponent, LoginComponent]

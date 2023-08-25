import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/forget-password', component: ForgetPasswordComponent },
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '',},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ForgetPasswordComponent, LoginComponent, HomeComponent, DashboardComponent]

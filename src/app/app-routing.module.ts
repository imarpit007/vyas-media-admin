import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { AdminComponent } from './views/admin/admin.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { EmployeeListComponent } from './views/employee-list/employee-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/forget-password', component: ForgetPasswordComponent },
  // { path: 'admin/reset-password/:emailAdd', component: ResetPasswordComponent },
  { path: 'admin/reset-password', component: ResetPasswordComponent },
  {
    path: 'admin/admin-panel',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {
          title: 'Dashboard',
          breadcrumb: [
            {
              title: 'Dashboard',
              url: '/',
            },
          ],
        },
      },
      {
        path: 'employee-list',
        component: EmployeeListComponent,
        data: {
          title: 'Employee List',
          breadcrumb: [
            {
              title: 'Dashboard',
              url: '/',
            },
            {
              title: 'Employee List',
              url: '/employee-list',
            },
          ],
        },
      }
    ]
  },
  { path: '**', redirectTo: '',},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  HomeComponent,
  LoginComponent,
  ForgetPasswordComponent,
  ResetPasswordComponent,
  AdminComponent,
  DashboardComponent,
  EmployeeListComponent,
]

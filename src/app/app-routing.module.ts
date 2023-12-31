import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { AdminComponent } from './views/admin/admin.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { EmployeeListComponent } from './views/employee-list/employee-list.component';
import { AddEmployeeComponent } from './views/add-employee/add-employee.component';
import { BlogListComponent } from './views/blog-list/blog-list.component';

import { AuthGuard } from './utils/guards/auth.guard';
import { NonAuthGuard } from './utils/guards/non-auth.guard';
import { AddBlogComponent } from './views/add-blog/add-blog.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'admin/login',
    component: LoginComponent,
    // canActivate: [NonAuthGuard]
  },
  {
    path: 'admin/forget-password',
    component: ForgetPasswordComponent,
    // canActivate: [NonAuthGuard]
  },
  // { path: 'admin/reset-password/:emailAdd', component: ResetPasswordComponent },
  {
    path: 'admin/reset-password',
    component: ResetPasswordComponent,
    // canActivate: [NonAuthGuard]
  },
  {
    path: 'admin/admin-panel',
    component: AdminComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {
          title: 'Dashboard',
          breadcrumb: [
            {
              title: 'Dashboard',
              url: 'admin/admin-panel',
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
              url: 'admin/admin-panel',
            },
            {
              title: 'Employee List',
              url: '/employee-list',
            },
          ],
        },
      },
      {
        path: 'add-employee',
        component: AddEmployeeComponent,
        data: {
          title: 'Add Employee',
          breadcrumb: [
            {
              title: 'Dashboard',
              url: 'admin/admin-panel',
            },
            {
              title: 'Employee List',
              url: '/employee-list',
            },
            {
              title: 'Add Employee',
              url: '/add-employee',
            },
          ],
        },
      },
      {
        path: 'blog-list',
        component: BlogListComponent,
        data: {
          title: 'Blogs',
          breadcrumb: [
            {
              title: 'Dashboard',
              url: 'admin/admin-panel',
            },
            {
              title: 'Blogs',
              url: '/blog-list',
            },
          ],
        },
      },
      {
        path: 'add-blog',
        component: AddBlogComponent,
        data: {
          title: 'Add Blog',
          breadcrumb: [
            {
              title: 'Dashboard',
              url: 'admin/admin-panel',
            },
            {
              title: 'Blogs',
              url: '/blog-list',
            },
            {
              title: 'Add Blog',
              url: '/add-blog',
            },
          ],
        },
      },
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
  AddEmployeeComponent,
  BlogListComponent,
  AddBlogComponent,
]

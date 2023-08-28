import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppButtonComponent } from './components/app-button/app-button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';

import { FooterComponent } from './views/admin/footer/footer.component';
import { HeaderComponent } from './views/admin/header/header.component';
import { MenuSidebarComponent } from './views/admin/menu-sidebar/menu-sidebar.component';
import { PageHeaderComponent } from './views/admin/page-header/page-header.component';
import { UserDropdownMenuComponent } from './views/admin/header/user-dropdown-menu/user-dropdown-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    AppButtonComponent,
    FooterComponent,
    HeaderComponent,
    MenuSidebarComponent,
    PageHeaderComponent,
    UserDropdownMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DataTablesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

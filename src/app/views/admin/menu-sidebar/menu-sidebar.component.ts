import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/utils/services/api.service';
import { AppService } from 'src/app/utils/services/app.service';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent {
  @ViewChild('mainSidebar', { static: false }) mainSidebar:any;
  @Output() mainSidebarHeight: EventEmitter<any> = new EventEmitter<any>();
  public userInfo = JSON.parse(localStorage.getItem("userInfo")!);

  constructor(private appService: AppService, private apiService: ApiService) {
    
  }

}

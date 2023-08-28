import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/utils/services/api.service';
import { AppService } from 'src/app/utils/services/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public count: any;
  public userInfo = JSON.parse(localStorage.getItem("userInfo")!);
  constructor(
    private router: Router,
    private apiService: ApiService,
    private appService: AppService
  ) {}

  ngOnInit() {
    
  }

}

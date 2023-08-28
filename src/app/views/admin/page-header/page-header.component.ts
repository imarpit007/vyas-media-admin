import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { ApiService } from 'src/app/utils/services/api.service';
import { AppService } from 'src/app/utils/services/app.service';

class BreadCrumb {
  title: string;
  url: string;
}

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  pageTitle: string = 'Dashboard';
  breadcrumbs: BreadCrumb[];
  public CategoryName: any;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private appService: AppService, 
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadCurrentRoute();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route),
      map(route => {
        while (route.firstChild) route = route.firstChild
        return route
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe((data : any) => {
      // console.log("____data____",data)
      this.pageTitle = data?.title;
      this.breadcrumbs = data?.breadcrumb
    });
  }

  private loadCurrentRoute(): any {
    const root = this.router.routerState.snapshot.root;
    const routeData = this.lastChild(root);
  }

  private lastChild(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    if (route.firstChild) {
      return this.lastChild(route.firstChild);
    } else {
      return route;
    }
  }

}

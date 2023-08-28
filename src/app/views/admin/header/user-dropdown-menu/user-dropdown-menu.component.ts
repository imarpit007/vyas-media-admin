import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/utils/services/api.service';
import { AppService } from 'src/app/utils/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-dropdown-menu',
  templateUrl: './user-dropdown-menu.component.html',
  styleUrls: ['./user-dropdown-menu.component.scss']
})
export class UserDropdownMenuComponent implements OnInit {
  public user:any;
  public userData = JSON.parse(localStorage.getItem("userInfo")!);

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private appService: AppService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.appService.user;
  }

  @ViewChild('dropdownMenu', { static: false }) dropdownMenu :any;
  @HostListener('document:click', ['$event'])
  clickout(event : any) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.hideDropdownMenu();
    }
  }

  showDropdownMenu() {
    if (this.dropdownMenu) {
      this.renderer.addClass(this.dropdownMenu.nativeElement, 'show');
    }
  }

  hideDropdownMenu() {
    if (this.dropdownMenu) {
      this.renderer.removeClass(this.dropdownMenu.nativeElement, 'show');
    }
  }

  toggleDropdownMenu() {
    if (this.dropdownMenu.nativeElement.classList.contains('show')) {
      this.hideDropdownMenu();
    } else {
      this.showDropdownMenu();
    }
  }

  // async logout() {
  //   await this.apiService.onLogout().subscribe((result: any) => {
  //     if(result.success) {
  //       // swal success
  //       this.appService.logout();
  //     } else {
  //       // swal error
  //     }
  //   });
  // }

  logout() {
    this.appService.logout();
    Swal.fire({
      text: "Logout Successful",
      icon: 'success',
    });
    // this.router.navigate(['/admin/login']);
  }

}

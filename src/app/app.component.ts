import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MainService } from './services/main.service';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { environment } from '../environment';
declare var $: any;


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, NavbarComponent, FooterComponent, MatSliderModule, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sulthan-gulf-kitchen';
  private _authService = inject(AuthService);
  public mainService = inject(MainService);
  private _router = inject(Router);

  constructor() {
    this._router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this._authService.IsAdmin = this._router.url.includes('/admin') ? true : false;
      }
    });
    setTimeout(() => {
      this.checkUser();
    }, 1000);
  }

  checkUser() {
    const token = localStorage.getItem('token');
      if (token) {
        const parsedToken = JSON.parse(token);
        if (parsedToken) {
          if (new Date() > new Date(parsedToken.tokenExpireAt)) {
            localStorage.removeItem('token')
            this.redirectToLogin();
          }
          else {
            this._authService.CurrentLoggedInUser = parsedToken;
            this._authService.CurrentUserRole = parsedToken.usertype;
          }
        }
        else {
          this.redirectToLogin();
        }
      }
      else {
        this.redirectToLogin();
      }
  }

  redirectToLogin() {
    if (!this._authService.IsAdmin) {
      this._router.navigate(['login']);
    }
    else {
      this._router.navigate(['admin/login']);
    }
  }
}
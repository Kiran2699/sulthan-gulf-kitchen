import { AfterContentChecked, AfterViewChecked, Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  HambugerMenu!:any;

  constructor(public _mainService: MainService, private router: Router) {}
  ngOnInit(): void {
    this.onResize();
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        document.getElementById('hamb-container')?.classList.remove('open');
        document.getElementById('side-menu-wrapper')?.classList.remove('open');
        document.getElementById('backdrop')?.classList.remove('open');
      }
    });
  }

  onMenuClick = () => {
    document.getElementById('hamb-container')?.classList.toggle('open');
    document.getElementById('side-menu-wrapper')?.classList.toggle('open');
    document.getElementById('backdrop')?.classList.toggle('open');
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 769) {
      this._mainService.IsMobile = true;
    }
    else {
      this._mainService.IsMobile = false; 
    }
  }

}

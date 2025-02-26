import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MainService } from '../main.service';

@Component({
  selector: 'app-food-menus',
  imports: [CommonModule],
  templateUrl: './food-menus.component.html',
  styleUrl: './food-menus.component.scss'
})
export class FoodMenusComponent implements OnInit {
  MenuList: { name: string, subname: string, price: string, url: string}[] = [];

  constructor(private _mainService: MainService) {
    this._mainService.getData().subscribe(response => {
      if (response.Menu && response.Menu.length > 0) {
        response.Menu.forEach((item: any) => {
          this.MenuList.push({
            name: item.name,
            subname: item.subname,
            price: item.price,
            url: item.url
          });
        });
      }
    });
  }

  ngOnInit(): void {
  }

}

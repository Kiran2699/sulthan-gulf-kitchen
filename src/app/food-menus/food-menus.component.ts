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
  BiriyaniMenuList: { name: string, price: string, url: string}[] = [];
  MandiMenuList: { name: string, price: string, url: string}[] = [];
  LargeMenuList: { name: string, price: string, url: string}[] = [];
  CurryMenuList: { name: string, price: string, url: string}[] = [];
  AddonsMenuList: { name: string, price: string, url: string}[] = [];

  constructor(private _mainService: MainService) {
    this._mainService.getData().subscribe(response => {
      if (response) {
        response.Biriyani.forEach((item: any) => {
          this.BiriyaniMenuList.push({
            name: item.name,
            price: item.price,
            url: item.url
          });
        });
        response.Mandi.forEach((item: any) => {
          this.MandiMenuList.push({
            name: item.name,
            price: item.price,
            url: item.url
          });
        });
        response.Large.forEach((item: any) => {
          this.LargeMenuList.push({
            name: item.name,
            price: item.price,
            url: item.url
          });
        });
        response.Curry.forEach((item: any) => {
          this.CurryMenuList.push({
            name: item.name,
            price: item.price,
            url: item.url
          });
        });
        response.Addons.forEach((item: any) => {
          this.AddonsMenuList.push({
            name: item.name,
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

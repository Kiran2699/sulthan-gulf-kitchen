import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainService } from '../main.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environment';
declare var $: any;

export type foodMenuDetail = {
  commonFoodDetail: CommonFoodDetail;
  sizeVarient: CommonFoodDetail[];
}

export type CommonFoodDetail = {
  name: string;
  price: string;
  url: string;
}

@Component({
  selector: 'app-food-menus',
  imports: [CommonModule, MatTabsModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './food-menus.component.html',
  styleUrl: './food-menus.component.scss'
})

export class FoodMenusComponent implements AfterViewInit {
  MenuType: 'P' | 'R' = 'P';
  SelectedItem: foodMenuDetail = {
    commonFoodDetail: { name: '', price: '', url: '' }, sizeVarient: []
  };
  SelectedCusine = '';
  SelectedSize = 'H';
  SelectedSizeItemToDisplay!: CommonFoodDetail;
  MenuUrlPrefix = environment.menuUrlPrefix;

  ArabicMenuList: foodMenuDetail[] = [];
  disableArabicPrev = true;
  disableArabicNext = false;

  IndianMenuList: foodMenuDetail[] = [];
  disableIndianPrev = true;
  disableIndianNext = false;

  MandiMenuList: foodMenuDetail[] = [];
  disableMandiPrev = true;
  disableMandiNext = false;

  BrMenuList: foodMenuDetail[] = [];
  disableBrPrev = true;
  disableBrNext = false;

  CurMenuList: foodMenuDetail[] = [];
  disableCurPrev = true;
  disableCurNext = false;

  AddMenuList: foodMenuDetail[] = [];
  disableAddPrev = true;
  disableAddNext = false;

  constructor(private _mainService: MainService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.MenuType = params['type'] && params['type'] != '' ? params['type'] : 'P';
      this.structureData();
    });
  }

  ngAfterViewInit(): void {
    
  }

  structureData() {
    if (this.MenuType == 'P') {
      this._mainService.getPartyOrderData().subscribe(response => {
        this.pushData(response);
      });
    }
    else {
      this._mainService.getRetailOrderData().subscribe(response => {
        this.pushData(response);
      });
    }
  }

  pushData(response: any) {
    if (response) {
      this.ArabicMenuList = [];
      this.IndianMenuList = [];
      this.MandiMenuList = [];
      this.BrMenuList = [];
      this.CurMenuList = [];
      this.AddMenuList = [];

      response.Arabic.forEach((item: any, index: number) => {
        let sizeVarient: CommonFoodDetail[] = [];
        item.sizeVarient.forEach((sizeItem: any) => {
          sizeVarient.push({
            name: sizeItem.name,
            price: sizeItem.price,
            url: sizeItem.url,
          });
        });
        this.ArabicMenuList.push({
          commonFoodDetail: {
            name: item.name,
            price: item.price,
            url: item.url,
          },
          sizeVarient: sizeVarient
        });
      });

      response.Indian.forEach((item: any, index: number) => {
        let sizeVarient: CommonFoodDetail[] = [];
        item.sizeVarient.forEach((sizeItem: any) => {
          sizeVarient.push({
            name: sizeItem.name,
            price: sizeItem.price,
            url: sizeItem.url,
          });
        });
        this.IndianMenuList.push({
          commonFoodDetail: {
            name: item.name,
            price: item.price,
            url: item.url,
          },
          sizeVarient: sizeVarient
        });
      });

      response.Mandi.forEach((item: any, index: number) => {
        let sizeVarient: CommonFoodDetail[] = [];
        item.sizeVarient.forEach((sizeItem: any) => {
          sizeVarient.push({
            name: sizeItem.name,
            price: sizeItem.price,
            url: sizeItem.url,
          });
        });
        this.MandiMenuList.push({
          commonFoodDetail: {
            name: item.name,
            price: item.price,
            url: item.url,
          },
          sizeVarient: sizeVarient
        });
      });

      response.Biriyani.forEach((item: any, index: number) => {
        let sizeVarient: CommonFoodDetail[] = [];
        item.sizeVarient.forEach((sizeItem: any) => {
          sizeVarient.push({
            name: sizeItem.name,
            price: sizeItem.price,
            url: sizeItem.url,
          });
        });
        this.BrMenuList.push({
          commonFoodDetail: {
            name: item.name,
            price: item.price,
            url: item.url,
          },
          sizeVarient: sizeVarient
        });
      });

      response.Curry.forEach((item: any, index: number) => {
        let sizeVarient: CommonFoodDetail[] = [];
        item.sizeVarient.forEach((sizeItem: any) => {
          sizeVarient.push({
            name: sizeItem.name,
            price: sizeItem.price,
            url: sizeItem.url,
          });
        });
        this.CurMenuList.push({
          commonFoodDetail: {
            name: item.name,
            price: item.price,
            url: item.url,
          },
          sizeVarient: sizeVarient
        });
      });

      response.Addons.forEach((item: any, index: number) => {
        let sizeVarient: CommonFoodDetail[] = [];
        item.sizeVarient.forEach((sizeItem: any) => {
          sizeVarient.push({
            name: sizeItem.name,
            price: sizeItem.price,
            url: sizeItem.url,
          });
        });
        this.AddMenuList.push({
          commonFoodDetail: {
            name: item.name,
            price: item.price,
            url: item.url,
          },
          sizeVarient: sizeVarient
        });
      });
    }
  }

  scroll(direction: 'left' | 'right', element: HTMLDivElement, menuHeader: string) {
    const scrollAmount = element.offsetWidth * 1;
    direction === 'left' ? element.scrollBy({ left: -scrollAmount, behavior: 'smooth' }) : element.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setTimeout(() => this.updateButtonState(element, menuHeader), 300);
  }

  updateButtonState(el: HTMLDivElement, menuHeader: string) {
    const maxScroll = el.scrollWidth - el.clientWidth;
    const scrollLeft = el.scrollLeft;
    switch (menuHeader) {
      case 'ar':
        this.disableArabicPrev = scrollLeft <= 0;
        this.disableArabicNext = scrollLeft >= maxScroll - 0.5;
        break;
      case 'ind':
        this.disableIndianPrev = scrollLeft <= 0;
        this.disableIndianNext = scrollLeft >= maxScroll - 0.5;
      break;
      case 'man':
        this.disableMandiPrev = scrollLeft <= 0;
        this.disableMandiNext = scrollLeft >= maxScroll - 0.5;
      break;
      case 'br':
        this.disableBrPrev = scrollLeft <= 0;
        this.disableBrNext = scrollLeft >= maxScroll - 0.5;
      break;
      case 'cur':
        this.disableCurPrev = scrollLeft <= 0;
        this.disableCurNext = scrollLeft >= maxScroll - 0.5;
      break;
      case 'add':
        this.disableAddPrev = scrollLeft <= 0;
        this.disableAddNext = scrollLeft >= maxScroll - 0.5;
    }
  }

  selectItem(item: foodMenuDetail, cusine: string) {
    this.SelectedCusine = cusine;
    this.SelectedItem = item;
    this.SelectedSizeItemToDisplay = item.sizeVarient[0];
    this.SelectedSize = item.sizeVarient.length === 3 ? 'Q' : 'H';
    $('#selectedItemModel').modal('show');
  }

  selectSize(size: string, index: number) {
    this.SelectedSize = size;
    if (this.SelectedItem) {
      this.SelectedSizeItemToDisplay = this.SelectedItem.sizeVarient[index];
    }
  }

  cancelItem() {
    this.SelectedSize = 'H';
    this.SelectedCusine = '';
    $('#selectedItemModel').modal('hide');
  }

  addItem() {

  }
}

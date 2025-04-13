import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainService } from '../main.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
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
  SelectedSize = 'S';
  SelectedSizeItemToDisplay!: CommonFoodDetail;

  ArabicMenuList: foodMenuDetail[] = [];
  disableArabicPrev = true;
  disableArabicNext = false;

  IndianMenuList: foodMenuDetail[] = [];
  disableIndianPrev = true;
  disableIndianNext = false;

  OtherMenuList: foodMenuDetail[] = [];
  disableOtherPrev = true;
  disableOtherNext = false;

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
      this.OtherMenuList = [];
      
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

      response.Others.forEach((item: any, index: number) => {
        let sizeVarient: CommonFoodDetail[] = [];
        item.sizeVarient.forEach((sizeItem: any) => {
          sizeVarient.push({
            name: sizeItem.name,
            price: sizeItem.price,
            url: sizeItem.url,
          });
        });
        this.OtherMenuList.push({
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
      case 'ot':
        this.disableOtherPrev = scrollLeft <= 0;
        this.disableOtherNext = scrollLeft >= maxScroll - 0.5;
    }
  }

  selectItem(item: foodMenuDetail, cusine: string) {
    this.SelectedCusine = cusine;
    this.SelectedItem = item;
    this.SelectedSizeItemToDisplay = item.sizeVarient[0];
    $('#selectedItemModel').modal('show');
  }

  selectSize(size: string, index: number) {
    this.SelectedSize = size;
    if (this.SelectedItem) {
      this.SelectedSizeItemToDisplay = this.SelectedItem.sizeVarient[index];
    }
  }

  cancelItem() {
    this.SelectedSize = 'S';
    this.SelectedCusine = '';
    $('#selectedItemModel').modal('hide');
  }

  addItem() {

  }
}

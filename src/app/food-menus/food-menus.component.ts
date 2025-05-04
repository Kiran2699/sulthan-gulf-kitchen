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

@Component({
  selector: 'app-food-menus',
  imports: [CommonModule, MatTabsModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './food-menus.component.html',
  styleUrl: './food-menus.component.scss'
})

export class FoodMenusComponent implements AfterViewInit {
  MenuType: 'P' | 'R' = 'P';
  SelectedItem!: any;
  SelectedSize = 'Q';
  SelectedSizeItemToDisplay!: any;
  MenuUrlPrefix = environment.menuUrlPrefix;

  ArabicMenuList: any[] = [];
  disableArabicPrev = true;
  disableArabicNext = false;

  IndianMenuList: any[] = [];
  disableIndianPrev = true;
  disableIndianNext = false;

  BrMenuList: any[] = [];
  disableBrPrev = true;
  disableBrNext = false;

  CurMenuList: any[] = [];
  disableCurPrev = true;
  disableCurNext = false;

  AddMenuList: any[] = [];
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
    this.ArabicMenuList = [];
    this.IndianMenuList = [];
    this.BrMenuList = [];
    this.CurMenuList = [];
    this.AddMenuList = [];
    this._mainService.getItems(this.MenuType).subscribe(response => {
      this.ArabicMenuList = response.filter((res: any) => res.cusine === 'arabic');
      this.IndianMenuList = response.filter((res: any) => res.cusine === 'indian');
      this.BrMenuList = response.filter((res: any) => res.cusine === 'biriyani');
      this.CurMenuList = response.filter((res: any) => res.cusine === 'curry');
      this.AddMenuList = response.filter((res: any) => res.cusine === 'addons');
    });
  }

  scroll(direction: 'left' | 'right', element: HTMLDivElement, menuHeader: string) {
    const scrollAmount = element.offsetWidth * 1;
    direction === 'left' ? element.scrollBy({ left: -scrollAmount, behavior: 'smooth' }) : element.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setTimeout(() => this.updateButtonState(element, menuHeader), 300);
  }

  updateButtonState(el: HTMLDivElement, menuHeader: string) {
    const maxScroll = el.scrollWidth - el.clientWidth;
    const scrollLeft = el.scrollLeft;
    console.log(el, menuHeader);
    switch (menuHeader) {
      case 'arabic':
        this.disableArabicPrev = scrollLeft <= 0;
        this.disableArabicNext = scrollLeft >= maxScroll - 0.5;
        break;
      case 'indian':
        this.disableIndianPrev = scrollLeft <= 0;
        this.disableIndianNext = scrollLeft >= maxScroll - 0.5;
      break;
      case 'biriyani':
        this.disableBrPrev = scrollLeft <= 0;
        this.disableBrNext = scrollLeft >= maxScroll - 0.5;
      break;
      case 'curry':
        this.disableCurPrev = scrollLeft <= 0;
        this.disableCurNext = scrollLeft >= maxScroll - 0.5;
      break;
      case 'addons':
        this.disableAddPrev = scrollLeft <= 0;
        this.disableAddNext = scrollLeft >= maxScroll - 0.5;
    }
  }

  selectItem(item: any) {
    this.SelectedSizeItemToDisplay = item.sizevar[0];
    this.SelectedItem = item;
    this.SelectedSize = item.sizevar.length === 3 ? 'Q' : 'H';
    $('#selectedItemModel').modal('show');
  }

  selectSize(size: string, index: number) {
    this.SelectedSize = size;
    if (this.SelectedItem) {
      this.SelectedSizeItemToDisplay = this.SelectedItem.sizevar[index];
    }
  }

  cancelItem() {
    this.SelectedSize = 'Q';
    $('#selectedItemModel').modal('hide');
  }

  addItem() {

  }
}

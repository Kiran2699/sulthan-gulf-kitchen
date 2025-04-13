import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { foodMenuDetail } from './food-menus/food-menus.component';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  IsMobile = false;
  SelectedItem = new BehaviorSubject<foodMenuDetail[] | null>(null);

  constructor(private _http: HttpClient) { }

  getPartyOrderData(): Observable<any> {
    return this._http.get<any>('assets/JSON/party-menu.json');
  }

  getRetailOrderData(): Observable<any> {
    return this._http.get<any>('assets/JSON/retail-menu.json');
  }
}

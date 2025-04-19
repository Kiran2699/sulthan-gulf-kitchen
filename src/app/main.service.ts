import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { foodMenuDetail } from './food-menus/food-menus.component';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  IsMobile = false;
  SelectedItem = new BehaviorSubject<foodMenuDetail[] | null>(null);
  RetailMenuData = environment.retailMenuData;
  PartyMenuData = environment.partyMenuData;

  constructor(private _http: HttpClient) { }

  getPartyOrderData = (): Observable<any> => this._http.get<any>(this.PartyMenuData)

  getRetailOrderData = (): Observable<any> => this._http.get<any>(this.RetailMenuData);
  
}

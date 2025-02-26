import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  IsMobile = false;

  constructor(private _http: HttpClient) { }

  getData(): Observable<any> {
    return this._http.get<any>('assets/JSON/menu.json');
  }
}

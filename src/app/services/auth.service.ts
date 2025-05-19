import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { collection, Firestore, query, where, collectionData } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  CurrentLoggedInUser!: any;
  CurrentUserRole = '';
  IsAdmin = false;
  private ApiUsed = false;
  private _mainService = inject(MainService);

  constructor(private _firestore: Firestore) {}

  doLogin(email: string, password: string, type: string): Observable<any[]> {
    this._mainService.IsLoading = true;
    const itemsRef = collection(this._firestore, 'users');
    let queryStr = query(itemsRef,
      where('usertype', '==', type), 
      where('email', '==', email),
      where('password', '==', password));
    const collData = collectionData(queryStr, { idField: 'id' }).pipe(
      map(users => users.map(({ orders, password, createdDate, ...rest }) => rest))
    );
    this._mainService.IsLoading = false;
    return collData;
  }
  
  doLogout() {
    this.CurrentLoggedInUser = null;
    this.CurrentUserRole = '';
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
  }

  markApiUsed() {
    this.ApiUsed = true;
  }

  hasUsedApi(): boolean {
    return this.ApiUsed;
  }

  getUsers(): Observable<any[]> {
    this._mainService.IsLoading = true;
    const itemsRef = collection(this._firestore, 'users');
    const collData = collectionData(itemsRef, { idField: 'id' });
    this._mainService.IsLoading = false;
    return collData;
  }
}

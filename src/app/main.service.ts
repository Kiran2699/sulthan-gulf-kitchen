import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../environment';
import { Firestore, collection, addDoc, doc, collectionData, where, query, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { getDoc, orderBy, QueryConstraint } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  IsMobile = false;
  SelectedItem = new BehaviorSubject<any[] | null>(null);
  RetailMenuData = environment.retailMenuData;
  PartyMenuData = environment.partyMenuData;
  IsAdmin = false;
  IsLoading = false;
  AlertText = '';
  HideNavbar = false;
  CurrentLoggedInUser!: any;
  CurrentUserRole = '';
  CurrFormatedDate = new Date().toLocaleDateString('en-GB')

  constructor(private _http: HttpClient, private _firestore: Firestore, private router: Router) { }

  doLogin(email: string, password: string, type: string): Observable<any[]> {
    this.IsLoading = true;
    const itemsRef = collection(this._firestore, 'users');
    let queryStr = query(itemsRef,
      where('usertype', '==', type), 
      where('email', '==', email),
      where('password', '==', password));
    const collData = collectionData(queryStr).pipe(
      map(users => users.map(({ orders, password, createdDate, phone, ...rest }) => rest))
    );
    this.IsLoading = false;
    return collData;
  }

  doLogout() {
    this.CurrentLoggedInUser = null;
    localStorage.removeItem('token');
  }

  async addData(collectionName: string, data: any) {
    this.IsLoading = true;
    const collectionRef = collection(this._firestore, collectionName);
    const docData =  await addDoc(collectionRef, data);
    this.IsLoading = false;
    return docData;
  }

  async updateData(collName: string, docId: string, updatedData: any) {
    this.IsLoading = true;
    const docRef = doc(this._firestore, `${collName}/${docId}`);
    const docData = await updateDoc(docRef, updatedData);
    this.IsLoading = false;
    return docData;
  }

  async deleteData(collName: string, docId: string) {
    this.IsLoading = true;
    const docRef = doc(this._firestore, `${collName}/${docId}`);
    const docData = await deleteDoc(docRef);
    this.IsLoading = false;
    return docData;
  }

  getItems(type: string): Observable<any[]> {
    this.IsLoading = true;
    const itemsRef = collection(this._firestore, 'food-menu');
    let queryStr;
    if (type == 'A') {
      queryStr = query(itemsRef);
    }
    else {
      queryStr = query(itemsRef, where('type', '==', type));
    }
    const collData = collectionData(queryStr, { idField: 'id' });
    this.IsLoading = false;
    return collData;
  }

  getStocks(fromDte: string, toDte: string): Observable<any[]> {
    this.IsLoading = true;
    const itemsRef = collection(this._firestore, 'stocks');
    let queryStr = query(itemsRef);
    if (fromDte != '' && toDte != '') {
      queryStr = query(itemsRef, where('date', '>=', fromDte), where('date', '<=', toDte), orderBy('Document ID', 'desc'));
    }
    else if (fromDte != '' && toDte == '') {
      queryStr = query(itemsRef, where('date', '==', fromDte), orderBy('Document ID', 'desc'));
    }
    const collData = collectionData(queryStr, { idField: 'id' });
    this.IsLoading = false;
    return collData;
  }

  getUsers(): Observable<any[]> {
    this.IsLoading = true;
    const itemsRef = collection(this._firestore, 'users');
    const collData = collectionData(itemsRef, { idField: 'id' });
    this.IsLoading = false;
    return collData;
  }

  hideSnackBar(timems: number) {
    setTimeout(() => {
      this.AlertText = '';
    }, timems);
  }

  sortByDate(data: any, isAscending = true) {
    const formatedData = data.sort((a: any, b: any) => {
      const [dayA, monthA, yearA] = a.date.split('/').map(Number);
      const [dayB, monthB, yearB] = b.date.split('/').map(Number);
      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);
      if (isAscending) {
        return dateA.getTime() - dateB.getTime();
      }
      else {
        return dateB.getTime() - dateA.getTime();
      }
    });
    return formatedData;
  }
}

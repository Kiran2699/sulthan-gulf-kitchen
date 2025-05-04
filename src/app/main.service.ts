import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environment';
import { Firestore, collection, addDoc, setDoc, doc, collectionData, where, query, updateDoc, deleteDoc } from '@angular/fire/firestore';

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

  constructor(private _http: HttpClient, private _firestore: Firestore) { }

  async addData(collectionName: string, data: any) {
    this.IsLoading = true;
    const collectionRef = collection(this._firestore, collectionName);
    const docData =  await addDoc(collectionRef, data);
    this.IsLoading = false;
    return docData;
  }

  async updateData(docId: string, updatedData: any) {
    this.IsLoading = true;
    const docRef = doc(this._firestore, `${environment.foodMenuColl}/${docId}`);
    const docData = await updateDoc(docRef, updatedData);
    this.IsLoading = false;
    return docData;
  }

  async deleteData(docId: string) {
    this.IsLoading = true;
    const docRef = doc(this._firestore, `${environment.foodMenuColl}/${docId}`);
    const docData = await deleteDoc(docRef);
    this.IsLoading = false;
    return docData;
  }

  getItems(type: string): Observable<any[]> {
    this.IsLoading = true;
    const itemsRef = collection(this._firestore, 'food-menu');
    let queryStr;
    if (type == 'R') {
      queryStr = query(itemsRef, where('type', '==', 'R'));
    }
    else if (type == 'P') {
      queryStr = query(itemsRef, where('type', '==', 'P'));
    }
    else {
      queryStr = itemsRef;
    }
    const collData = collectionData(queryStr, { idField: 'id' });
    this.IsLoading = false;
    return collData;
  }

  hideSnackBar(timems: number) {
    setTimeout(() => {
      this.AlertText = '';
    }, timems);
  }
}

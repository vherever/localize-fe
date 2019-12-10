import { Injectable } from '@angular/core';
// app imports
import { ObjectStorageAbstract } from './object-storage.abstract';

@Injectable({
  providedIn: 'root',
})
export class ObjectLocalStorageService extends ObjectStorageAbstract {
  constructor() {
    super(localStorage);
  }
}

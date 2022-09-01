import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }


  get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return null;
    }
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}

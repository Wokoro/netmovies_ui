import { Injectable } from '@angular/core';

Injectable({
  providedIn: 'root'
});
export class SessionStorageService {
  sessionStore = sessionStorage;
  constructor() {}

  save(store: string, value: any): void {
    this.sessionStore.setItem(store, value);
  }

  get(store: string): string {
    return this.sessionStore.getItem(store);
  }
}

import { Injectable } from '@angular/core';
import { SessionStorageService } from './session.storage.service';

Injectable({
  providedIn: 'root'
});
export class BrodcasterService {

broadcaster = new BroadcastChannel('favorite');
  constructor() {}

  post(message: string): void {
    this.broadcaster.postMessage(message);
  }

  listen(channel: string): void {
    this.broadcaster.onmessage = function(value) {
      sessionStorage.setItem(channel, value.data);
    };
  }
}

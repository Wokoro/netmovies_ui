import { Injectable } from '@angular/core';
import { Observable, Subscriber, fromEvent, of, merge } from 'rxjs';
import { mapTo } from 'rxjs/operators';

Injectable({
  providedIn: 'root'
});
export class NetworkService {
  constructor() { }

  networkStats(): Observable<any> {
    return merge(
      fromEvent(window, 'online').pipe( mapTo(true )),
      fromEvent(window, 'offline').pipe(mapTo(false)),
      of(navigator.onLine)
    );
  }
}

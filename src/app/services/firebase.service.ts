import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import movies from '../shared';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private database: AngularFireDatabase) { }

  getMovies() {
    return this.database.list('movies').valueChanges();
  }

  getMoviesLocal() {
    return movies;
  }
}

import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FavoriteMovieService implements OnInit {
  broadcaster;
  favorites: any = sessionStorage.getItem('favorites');
  favoriteArray = JSON.parse(this.favorites);

  constructor(private http: HttpClient, private authService: AuthService) {
    this.broadcaster = new BroadcastChannel('favorites');
  }

  ngOnInit() {}

  saveFavorite(movie: any) {
    if (this.authService.getCurrentUser()) {
      this.storeToServer(movie).subscribe();
    }
    this.favoriteArray ? this.favoriteArray : (this.favoriteArray = []);

    if (!this.favoriteArray) {
      this.favoriteArray.push(movie);
      this.storeToSession(this.favoriteArray);
      return;
    }

    this.favoriteArray.push(movie);
    this.storeToSession(this.favoriteArray);
  }

  bulkSaveFavoriteToServer() {
    const { token } = JSON.parse(localStorage.getItem('user') ?? '');
    const movies = JSON.parse(sessionStorage.getItem('favorites') ?? '');
    const HTTP_HEADERS = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
      withCredentials: true,
    };
    return this.http.post(
      'https://netmoviesapi.herokuapp.com/api/v1/favorite/bulkCreate',
      { data: movies },
      HTTP_HEADERS
    );
  }

  deleteFavorite(movie: any) {
    if (this.authService.getCurrentUser()) {
      this.deleteFromServer(movie).subscribe(null, (error) =>
        console.log('error: ', error)
      );
    }
    const favoriteMovie = JSON.parse(sessionStorage.getItem('favorites') ?? '');
    let modified = [];
    modified = favoriteMovie.filter((favorite: any) => {
      return !(favorite.poster_url == movie.poster_url);
    });

    this.favoriteArray.length = 0;
    this.favoriteArray.push(...modified);
    this.storeToSession(this.favoriteArray);
  }

  getAllFavorites() {
    return this.favoriteArray || [];
  }

  getAllServerFavorites() {
    if (JSON.parse(localStorage.getItem('user') ?? '')) {
      const { token } = JSON.parse(localStorage.getItem('user') ?? '');
      const HTTP_HEADERS = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
        withCredentials: true,
      };
      return this.http
        .get<any>(
          'https://netmoviesapi.herokuapp.com/api/v1/favorites',
          HTTP_HEADERS
        )
        .pipe(
          map(({ data }) => {
            const currentFavorites = this.getAllFavorites();
            const newFavorites = [];
            let repeated = false;
            if (currentFavorites.length) {
              data.map((movie: any) => {
                repeated = true;
                currentFavorites.forEach((element: any) => {
                  if (movie.poster_url === element.poster_url) {
                    repeated = true;
                  }
                });
                !repeated ? newFavorites.push(movie) : '';
              });
            } else {
              newFavorites.push(...data);
            }
            currentFavorites.push(...newFavorites);
            sessionStorage.setItem(
              'favorites',
              JSON.stringify(currentFavorites)
            );
          })
        );
    }
    return new Observable();
  }

  isFavorite(poster_url: string) {
    let isFav: any = sessionStorage.getItem('favorites');
    const favoriteArray = JSON.parse(isFav);
    let isFavorite = false;
    if (favoriteArray) {
      favoriteArray.map((favoriteMovie: any) => {
        if (favoriteMovie.poster_url === poster_url) {
          isFavorite = true;
        }
      });
    }
    return isFavorite;
  }

  storeToSession(value: any) {
    sessionStorage.setItem('favorites', JSON.stringify(value));
    this.broadcaster.postMessage(value);
  }

  storeToServer(movie: any) {
    const { token } = JSON.parse(localStorage.getItem('user') ?? '');
    const HTTP_HEADERS = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
      withCredentials: true,
    };
    return this.http.post(
      'https://netmoviesapi.herokuapp.com/api/v1/favorite/create',
      movie,
      HTTP_HEADERS
    );
  }

  deleteFromServer(movie: any) {
    const { poster_url } = movie;
    const { token } = JSON.parse(localStorage.getItem('user')?? '');
    const HTTP_HEADERS = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
      withCredentials: true,
    };
    return this.http.delete(
      `https://netmoviesapi.herokuapp.com/api/v1/favorite/?movie_url=${poster_url}`,
      HTTP_HEADERS
    );
  }
}

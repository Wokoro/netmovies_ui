import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { FavoriteMovieService } from '../../services/favorite.movie.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  modalList: Array<any>;
  @Input() movies: any;
  broadcaster = new BroadcastChannel('favorites');
  isLoggedIn: any;

  constructor(
    private movieService: FirebaseService,
    private favoriteService: FavoriteMovieService,
    private authService: AuthService
  ) {
    this.modalList = [];
  }

  ngOnInit() {
    // if (this.authService.getCurrentUser()) {
    //   this.favoriteService.bulkSaveFavoriteToServer()
    //   .subscribe();

    //   this.favoriteService.getAllServerFavorites()
    //   .subscribe(
    //     () => this.movies = this.movieService.getMovies(),
    //     (error: any) => {
    //       console.log('error occured', error);
    //       this.movies = this.movieService.getMovies();
    //     }
    //   );

    //   this.broadcaster.onmessage = (value) => {
    //     sessionStorage.setItem('favorites', JSON.stringify(value.data));
    //   };
    //   return;
    // }
    this.movies = this.movieService.getMovies();
  }
}

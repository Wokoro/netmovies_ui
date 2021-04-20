import { Component, OnInit, Input } from '@angular/core';
import { FavoriteMovieService } from '../../services/favorite.movie.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-favmovies',
  templateUrl: './favmovies.component.html',
  styleUrls: ['./favmovies.component.css']
})
export class FavmoviesComponent implements OnInit {

  broadcaster = new BroadcastChannel('favorites');
  favoriteMovies = this.favoriteMovieService.getAllFavorites();

  constructor(private favoriteMovieService: FavoriteMovieService, private authService: AuthService) {
  }

  ngOnInit() {
    if(this.authService.getCurrentUser()){
      this.favoriteMovieService.getAllServerFavorites()
      .subscribe(()=>{
        this.favoriteMovies = this.favoriteMovieService.getAllFavorites();
      });
      return;
    }

    this.favoriteMovies = this.favoriteMovieService.getAllFavorites();

    this.broadcaster.onmessage = (value) => {
      sessionStorage.setItem('favorites', JSON.stringify(value.data));
    };
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { faHeart as sHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as rHeart } from '@fortawesome/free-regular-svg-icons';
import { FavoriteMovieService } from '../../services/favorite.movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {


  @Input() icon: any;
  @Input() movie: any;

  constructor(private favoriteMovieService: FavoriteMovieService) {}

  ngOnInit() {
    this.icon = this.favoriteMovieService.isFavorite(this.movie.poster_url)
    ? sHeart
    : rHeart;
  }

  click(): void {
    if (this.icon === rHeart) {
      this.favoriteMovieService.saveFavorite(this.movie);
      this.icon = sHeart;
    } else {
      this.icon = rHeart;
      this.favoriteMovieService.deleteFavorite(this.movie);
    }
  }
}

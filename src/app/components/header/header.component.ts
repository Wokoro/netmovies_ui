import { Component, OnInit } from '@angular/core';
import { faSearch as sSearch } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  hideMenu: boolean;
  search = sSearch;
  isLoggedIn: boolean;

  constructor(private authService: AuthService) {
    this.hideMenu = true;
    this.isLoggedIn = false;
  }

  ngOnInit() {
    this.authService.currentUser
    .subscribe((data) => {this.isLoggedIn = !!data; });
  }

  menuToggler(event: any) {
    this.hideMenu =  this.hideMenu ? false : true;
  }

  logout() {
    this.authService.logout();
  }

}

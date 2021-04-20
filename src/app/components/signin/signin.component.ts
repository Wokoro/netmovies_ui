import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  email: string = '';
  password: string = '';
  modalList: any = [];

  constructor(private authService: AuthService, private router: Router) {
    if (authService.getCurrentUser()) {
      router.navigate(['/home']);
    }
  }

  ngOnInit() {
  }

  signIn(form: any) {
    this.authService.login(form.value)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate(['/home']);
        },
        ({ error }) => {
          console.log('error: ', error.message);
          const modal = { type: 'error', messages: [error.message] };
          this.modalList.push(modal);
          return;
        }
      );
    form.isDirty = false;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  name: any;
  password: any;
  confirmPassword: any;
  email: any;
  gender: any;
  signupForm: any;

  isSignedUp: boolean;

  modalList: Array<object>;

  constructor(private authService: AuthService, private router: Router) {
    this.modalList = [];
    this.isSignedUp = false;
   }

  ngOnInit() {
    this.name = new FormControl(null, [Validators.required, Validators.pattern(/[A-Za-z].*/)]);
    this.password = new FormControl(null, Validators.required);
    this.confirmPassword = new FormControl(null, Validators.required);
    this.email = new FormControl(null, Validators.required);
    this.gender = new FormControl('male', Validators.required);

    this.signupForm = new FormGroup({
      name: this.name,
      password: this.password,
      email: this.email,
      confirmPassword: this.confirmPassword,
      gender: this.gender
    });
  }

  isValid(field: FormControl) {
    return field.valid || field.untouched;
  }

  isValidConfirm(field: FormControl) {
    return !(this.confirmPassword.value === this.password.value) && field.dirty && !(field.value === '');
  }

  signup(form: FormGroup) {
    if (form.valid) {
      this.authService.signup(form.value)
      .subscribe( ( data: any ) => {
        if (data.status === 'success') {
          this.isSignedUp = true;
          const modal = { type: 'success', messages: ['Signup successful'] };
          this.modalList.push(modal);
          this.router.navigate(['/signin']);
        } else {
          console.log(data);
        }
      }, ({error}: any) => {
        if ( error.message.map ) {
          const modal = { type: 'error', messages: [...error.message.map( ( data: any) => data.msg )] };
          this.modalList.push(modal);
          console.log(this.modalList);
          return 0;
        }
        const modal = { type: 'error', messages: [error.message] };
        return this.modalList.push(modal);
      });
      // form.isDirty = false;
    }
  }
}

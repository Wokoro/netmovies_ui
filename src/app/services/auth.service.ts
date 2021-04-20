import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const HTTP_HEADERS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser: Observable<any>;
  private behaviourSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    let user: any = localStorage.getItem('user');
    this.behaviourSubject = new BehaviorSubject(
      JSON.parse(user)
    );
    this.currentUser = this.behaviourSubject.asObservable();
  }

  signup({
    name,
    email,
    password,
    confirmPassword,
    gender,
  }: any): Observable<any> {
    const url = 'https://netmoviesapi.herokuapp.com/api/v1/signup';
    const signupInfo: any = {
      name,
      email,
      password,
      confirmPassword,
      gender,
    };
    return this.http.post<any>(url, signupInfo, HTTP_HEADERS);
  }

  login({ email, password }: any): Observable<any> {
    const url = 'https://netmoviesapi.herokuapp.com/api/v1/signin';
    return this.http.post<any>(url, { email, password }, HTTP_HEADERS).pipe(
      map((result) => {
        if (result.status === 'success') {
          localStorage.setItem('user', JSON.stringify(result.data));
          this.behaviourSubject.next(result.data);
          return result.data;
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.behaviourSubject.next(null);
  }

  getCurrentUser() {
    return this.behaviourSubject.value;
  }
}

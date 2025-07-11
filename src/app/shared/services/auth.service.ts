import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

const environment = {
  production: false,
  apiUrl: 'http://192.168.1.187:5005/api'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_TOKEN_KEY = 'auth_token';
  private readonly USER_DATA_KEY = 'user_data';
  private readonly API_BASE_URL = `${environment.apiUrl}/User`;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const token = this.getToken();
    this.isLoggedInSubject.next(!!token); 
  }

  getToken(): string | null {
    return localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  getUserData(): any {
    const userData = localStorage.getItem(this.USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getCurrentAuthStatus(): boolean {
    return this.isLoggedInSubject.value;
  }

  signUp(userData: {
    Firstname: string;
    Lastname: string;
    Email: string;
    Password: string;
    RoleName: string;
  }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.API_BASE_URL}/SignUp`, userData, { headers }).pipe(
      tap((response: any) => {
        if (response.token) {
          this.storeAuthData(response.token, response.user);
        }
      })
    );
  }

  login(credentials: { Email: string; Password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.API_BASE_URL}/Login`, credentials, { headers }).pipe(
      tap((response: any) => {
        if (response.token) {
          this.storeAuthData(response.token, response.user);
        }
      })
    );
  }

  logout(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.API_BASE_URL}/Logout`, {}, { headers }).pipe(
      tap(() => {
        this.clearUserData();
        this.isLoggedInSubject.next(false);
        this.router.navigate(['/sign-in']);
      })
    );
  }

  private storeAuthData(token: string, userData: any): void {
    localStorage.setItem(this.AUTH_TOKEN_KEY, token);
    localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(userData));
    this.isLoggedInSubject.next(true);
  }

  private clearUserData(): void {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
    localStorage.removeItem(this.USER_DATA_KEY);
  }


}
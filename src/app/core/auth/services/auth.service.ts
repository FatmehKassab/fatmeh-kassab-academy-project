import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

const environment = {
  production: false,
  apiUrl: 'http://192.168.7.156:5005/api'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_TOKEN_KEY = 'auth_token';
  private readonly USER_DATA_KEY = 'user_data';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly API_BASE_URL = `${environment.apiUrl}/User`;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    this.initializeAuthState();
    console.log(this.isLoggedInSubject)
  }



  getToken(): string | null {
      console.log("tken1",this.AUTH_TOKEN_KEY)
    return localStorage.getItem(this.AUTH_TOKEN_KEY);
    
  }
  private initializeAuthState(): void {
    const token = this.getToken();
    this.isLoggedInSubject.next(!!token); 
  }
  getUserData(): any {
    const userData = localStorage.getItem(this.USER_DATA_KEY);
    console.log(userData)
    return userData ? JSON.parse(userData) : null;
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getCurrentAuthStatus(): boolean {
    return this.isLoggedInSubject.value;
  }

   get isLoggedInValue(): boolean {
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

    return this.http.post(`${this.API_BASE_URL}/SignUp()`, userData, { headers }).pipe(
      tap((response: any) => {
        if (response.token) {
          this.storeAuthData(response.token, response.refreshToken, response.user);
        }
      })
    );
  }

login(credentials: { Username: string; Password: string }): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  return this.http.post(`${this.API_BASE_URL}/Login()`, credentials, { headers }).pipe(
   tap((response: any) => {
  const token = response?.Login?.AccessToken;
  const refreshToken = response?.Login?.RefreshToken;
  const user = response?.Login;

  if (token && refreshToken) {
    this.storeAuthData(token, refreshToken, user);
  } else {
    console.warn('Missing token or refresh token in login response');
  }
})

  );
}


  // logout(): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });

  //   return this.http.post(`${this.API_BASE_URL}/Logout()`, {}, { headers }).pipe(
  //     tap(() => {
  //       this.clearUserData();
  //       this.isLoggedInSubject.next(false);
  //       this.router.navigate(['/sign-in']);
  //     })
  //   );
  // }

logout(): Observable<any> {
  const token = this.getToken();
  const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);

  if (!refreshToken) {
    console.warn('No refresh token found in storage — forcing logout');
    this.clearUserData();
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/sign-in']);
    return new Observable(); // empty observable, prevents API call
  }

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  const payload = {
    Token: token,
    RefreshToken: refreshToken
  };

  return this.http.post(`${this.API_BASE_URL}/Logout()`, payload, { headers }).pipe(
    tap(() => {
      this.clearUserData();
      this.isLoggedInSubject.next(false);
      this.router.navigate(['/sign-in']);
    })
  );
}



private storeAuthData(token: string, refreshToken: string, userData: any): void {
  localStorage.setItem(this.AUTH_TOKEN_KEY, token);
  localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken); 
  localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(userData));
  this.isLoggedInSubject.next(true);
}


  private clearUserData(): void {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_DATA_KEY);
    
  }


}
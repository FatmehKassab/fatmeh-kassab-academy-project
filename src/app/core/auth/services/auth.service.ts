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
  private readonly AUTH_TOKEN_KEY = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJacF9vNjJoV0FuZWRiNE0tcVZGQmNrdmViM1BsdnVlZGowTG1yTHFpNkhzIn0.eyJleHAiOjE3NTIyMjEyNTksImlhdCI6MTc1MjIyMDk1OSwianRpIjoiNjk0MWRhYTYtZjVjZi00ZjJiLTliM2UtMTc2YzVlNWViNjE4IiwiaXNzIjoiaHR0cDovL2FjYWRlbXktZnJvbnRlbmQtbW9kdWxlLWtleWNsb2FrOjgwODAvYXV0aC9yZWFsbXMvSU1fQWNhZGVteV9Gcm9udGVuZF9tb2R1bGUiLCJzdWIiOiJhYWNjNDRkMS01NTQzLTQyNmQtOTQyMy1jNGVjMWQzZGRhYTUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhY2NvdW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjIzNmZhY2E3LTAyZWQtNDgzZS1iZWQ3LTljYzM0NTc2N2MyZSIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiYWxpIHlhYWtvdWIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhbGkueWFha291YkBpbm1pbmQuYWkiLCJnaXZlbl9uYW1lIjoiYWxpIiwiZmFtaWx5X25hbWUiOiJ5YWFrb3ViIiwiZW1haWwiOiJhbGkueWFha291YkBpbm1pbmQuYWkifQ.HdGbO3OfZt3YgY4YptGngc7sApQV9djzPlbjmu2hXLCcxbZnkzyFRwncmxSOGI8UVkZnaZQT0n9t_ll9x-vO8ANsyrlMtcebsNGyblqYoXkszxQU6xZGRmtIf_I_p237fKDA5tt0tHOwOQlgDVrtE-_Uxgh4ixRBcQQJkPsxYiN74ELAGcFsIsjVMN8ScXjKsHo1EoL3b287GItVmTaDe6alv1uB5KDQt2lAX_L0PY03vBEr9mGYm1G1yVBFIm3LMj1EoWzZT6xUhr33AJEv1vapbdOoesRGe9kfkJsg8fTUnyBkPON4sP6fewGZZu-63zNvK863dmEYWANHS7dNoA';
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
          this.storeAuthData("hey", response.user);
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
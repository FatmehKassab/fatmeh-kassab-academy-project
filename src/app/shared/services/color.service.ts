import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private baseUrl = 'https://www.thecolorapi.com';

  constructor(private http: HttpClient) {}

getRandomColors(count: number = 5): Observable<any> {
  // Generate a random hex code
  const randomHex = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

  const params = new HttpParams()
    .set('hex', randomHex)
    .set('mode', 'analogic') 
    .set('count', count);

  return this.http.get(`${this.baseUrl}/scheme`, { params });
}

}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiBaseUrl : string = environment.apiBaseUrl;
  isLoading = new BehaviorSubject(false);
  constructor(
    private http: HttpClient
  ) { }

  show() { this.isLoading.next(true); }

  hide() { this.isLoading.next(false); }
  
  get(url: any) {
    return this.http.get(`${this.apiBaseUrl}${url}`);
  }
}

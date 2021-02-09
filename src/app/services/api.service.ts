import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiBaseUrl : string = environment.apiBaseUrl;
  
  constructor(
    private http: HttpClient
  ) { }


  get(url: any) {
    return this.http.get(`${this.apiBaseUrl}${url}`);
  }
}

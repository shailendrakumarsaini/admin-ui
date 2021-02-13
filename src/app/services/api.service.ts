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

  showLoader() { this.isLoading.next(true); }

  hideLoader() { this.isLoading.next(false); }
  
  get(url: any, headers?: HttpHeaders) {
    let httpOptions: any = {  
      withCredentials: true //required for cookies
    };
    if (headers) { httpOptions.headers = headers; }

    return this.http.get(`${this.apiBaseUrl}${url}`, httpOptions);
  }

  post(url:string, requestBody:any, headers?: HttpHeaders){
    let httpOptions: any = {  
      withCredentials: true //required for cookies
    };
    if (headers) { httpOptions.headers = headers; }

    return this.http.post(`${this.apiBaseUrl}${url}`, requestBody, httpOptions);
  }

  patch(url:string, requestBody:any, headers?: HttpHeaders){
    let httpOptions: any = {  
      withCredentials: true //required for cookies
    };
    if (headers) { httpOptions.headers = headers; }

    return this.http.patch(`${this.apiBaseUrl}${url}`, requestBody, httpOptions);
  }

  delete(url: any, id: string, headers?: HttpHeaders) {
    let httpOptions: any = {  
      withCredentials: true //required for cookies
    };
    if (headers) { httpOptions.headers = headers; }

    return this.http.delete(`${this.apiBaseUrl}${url}/${id}`, httpOptions);
  }
  
}

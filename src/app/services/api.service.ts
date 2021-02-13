import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiBaseUrl : string = environment.apiBaseUrl;
  isLoading = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private toastr : ToastrService
  ) { }

  showLoader() { this.isLoading.next(true); }

  hideLoader() { this.isLoading.next(false); }
  
  get(url: any, headers?: HttpHeaders) {
    let httpOptions: any = {  
      withCredentials: true //required for cookies
    };
    if (headers) { httpOptions.headers = headers; }

    return this.http.get(`${this.apiBaseUrl}${url}`, httpOptions).pipe(catchError(this.handleError));
  }

  post(url:string, requestBody:any, headers?: HttpHeaders){
    let httpOptions: any = {  
      withCredentials: true //required for cookies
    };
    if (headers) { httpOptions.headers = headers; }

    return this.http.post(`${this.apiBaseUrl}${url}`, requestBody, httpOptions).pipe(catchError(this.handleError));
  }

  patch(url:string, requestBody:any, headers?: HttpHeaders){
    let httpOptions: any = {  
      withCredentials: true //required for cookies
    };
    if (headers) { httpOptions.headers = headers; }

    return this.http.patch(`${this.apiBaseUrl}${url}`, requestBody, httpOptions).pipe(catchError(this.handleError));
  }

  delete(url: any, id: string, headers?: HttpHeaders) {
    let httpOptions: any = {  
      withCredentials: true //required for cookies
    };
    if (headers) { httpOptions.headers = headers; }

    return this.http.delete(`${this.apiBaseUrl}${url}/${id}`, httpOptions).pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
        console.error('Client Side Error :', errorResponse.error.message);
        this.toastr.error(errorResponse.error.message);
    } else {
        console.error('Server Side Error :', errorResponse);
        this.toastr.error(errorResponse.error.message);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
}
  
}

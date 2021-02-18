import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable, throwError } from "rxjs";
import { finalize } from 'rxjs/operators';
import { tap } from "rxjs/operators";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from "rxjs/operators";
@Injectable({
    providedIn:'root'
})
export class Interceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];
    constructor(
        private apiService: ApiService,
        private router: Router,
        private toastr : ToastrService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // req = req.clone({
        //     setHeaders: {
        //     'Content-Type': 'application/json',
        //     'Access-Control-Allow-Origin': '*'
        //     }
        // });

        const headerName = 'token';
        let token = localStorage.getItem('token');
        if (!req.headers.has(headerName) && !req.url.includes('login') && token) {
          req = req.clone({ setHeaders: { [headerName]: token } });
        }

        if (req) {
            this.requests.push(req);
            this.apiService.isLoading.next(true);
        }


        return next.handle(req).pipe(
            // <<<<<<<<<<<<<<<< Authorization >>>>>>>>>>>>>>>>>
            tap(
                event => {
                    if (event instanceof HttpResponse) {
                        if (event.status == 401) {
                            // console.log(event.body.message);
                            this.toastr.error('Session Expired');
                            localStorage.clear();
                            this.router.navigate(['/auth/login']);
                        }
                    }
                },
                error => {
                    if (error instanceof HttpErrorResponse) {
                        if (error.status == 401) {
                            // console.log(error);
                            this.toastr.error('Session Expired');
                            localStorage.clear();
                            this.router.navigate(['/auth/login']);
                        }
                    }
                }
            ),
            // <<<<<<<<<<<<<<<< Authorization >>>>>>>>>>>>>>>>>

            // <<<<<<<<<<<<<<<< Error Handling >>>>>>>>>>>>>>>>>
            catchError((errorResponse: HttpErrorResponse) => {
                if (errorResponse.error instanceof ErrorEvent) {
                    console.error('Client Side Error :', errorResponse.error.message);
                    this.toastr.error(errorResponse.error.message);
                } else {
                    console.error('Server Side Error :', errorResponse);
                    this.toastr.error(errorResponse.error.message);
                }
                return throwError(errorResponse);
            }),
            // <<<<<<<<<<<<<<<< Error Handling >>>>>>>>>>>>>>>>>
            
            finalize(() => {
                this.apiService.isLoading.next(false);
            }
            
        ));
    }
}
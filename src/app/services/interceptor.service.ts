import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from "rxjs/internal/Observable";
import { finalize } from 'rxjs/operators';
import { tap } from "rxjs/operators";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
                            sessionStorage.clear();
                            this.router.navigate(['/auth/login']);
                        }
                    }
                },
                error => {
                    if (error instanceof HttpErrorResponse) {
                        if (error.status == 401) {
                            // console.log(error);
                            this.toastr.error('Session Expired');
                            sessionStorage.clear();
                            this.router.navigate(['/auth/login']);
                        }
                    }
                }
            ),
            // <<<<<<<<<<<<<<<< Authorization >>>>>>>>>>>>>>>>>
            finalize(() => {
                this.apiService.isLoading.next(false);
            }
            
        ));
    }
}
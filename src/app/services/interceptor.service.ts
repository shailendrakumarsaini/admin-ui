import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor, HttpHandler, HttpEvent } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from "rxjs/internal/Observable";
import { finalize } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class Interceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];
    constructor(
        private apiService: ApiService,
        private tokenExtractor: HttpXsrfTokenExtractor,
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

            finalize(() => {
                this.apiService.isLoading.next(false);
            }
            
        ));
    }
}
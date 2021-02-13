import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,} from '@angular/router';
@Injectable({
    providedIn: 'root',
  })
  export class AuthGuard implements CanActivate {
  
    constructor(
      private router: Router
    ) { }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        if(localStorage.getItem('jwt')) {
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/login']);
        return false;
    }
  
  }

  @Injectable({
    providedIn: 'root',
  })
  export class LoginGuard implements CanActivate {
  
    constructor(
      private router: Router
    ) { }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        if(localStorage.getItem('jwt')) {
            this.router.navigate(['/dashboard/user']);
            return false;
        }
        return true;
    }
  
  }
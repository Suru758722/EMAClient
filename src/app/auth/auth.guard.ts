
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
        var token = localStorage.getItem('token');
      if (token != null) {

      return true;
    }
    else {
      this.router.navigate(['']);
      return false;
    }
  }



}

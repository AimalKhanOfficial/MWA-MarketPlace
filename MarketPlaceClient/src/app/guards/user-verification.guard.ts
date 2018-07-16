import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { store } from '../redux-store/store';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserVerificationGuard implements CanActivate {

  constructor(private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //If a user is not logged in and tries to navigate to verification page, this will verify it!
    console.log(store.getState().userReducer.email);
    if(store.getState().userReducer.email === undefined){
      this.router.navigate(['login']);
    }

    return true;
  }
}

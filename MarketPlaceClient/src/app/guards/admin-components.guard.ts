import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminComponentsGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log(sessionStorage.getItem("isLoggedIn"));
    if (sessionStorage.getItem("isLoggedIn") == "true") {
      if (sessionStorage.getItem("role") != "1") {
        this.router.navigate(['user']);
      }
    }
    else {
      this.router.navigate(['login']);
    }
    return true;
  }
}

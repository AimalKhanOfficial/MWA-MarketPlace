import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserComponentsGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (sessionStorage.getItem("isLoggedIn") == "true") {
      console.log(sessionStorage.getItem("role"))
      if (sessionStorage.getItem("role") != "0") {
        this.router.navigate(['admin']);
      }
    }
    else {
      this.router.navigate(['login']);
    }
    return true;
  }
}

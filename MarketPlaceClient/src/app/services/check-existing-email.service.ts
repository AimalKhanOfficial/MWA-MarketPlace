import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckExistingEmailService {

  constructor() { }

  checkEmail(http, email) {
    return http.get("http://localhost:3000/users/" + email);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VerifyUserService {

  constructor() { }

  verifyUser(http, email){
    return http.get("http://localhost:3000/users/verifyUser/" + email);
  }
}

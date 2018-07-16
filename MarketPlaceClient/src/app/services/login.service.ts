//Aimal Khan
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  loginUser(http, emailParam, passwordParam){
    return http.post("http://localhost:3000/users/login", {
      email : emailParam, 
      password : passwordParam
    });
  }
}

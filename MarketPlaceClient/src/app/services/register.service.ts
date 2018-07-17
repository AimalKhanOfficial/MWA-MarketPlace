import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  register(http, userNameParam, passWordParam, emailParam, contactNumberParam, locationParam) {
    return http.post("http://localhost:3000/users/register", {
      userName: userNameParam,
      passWord: passWordParam,
      email: emailParam,
      contactNumber: contactNumberParam,
      lat: locationParam[1], 
      long: locationParam[0]
    });
  }
}

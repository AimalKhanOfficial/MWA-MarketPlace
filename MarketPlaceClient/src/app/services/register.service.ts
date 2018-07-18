import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  updateInfo(http, userNameParam, passWordParam, contactNumberParam, pUserId) {
    return http.put("http://localhost:3000/users/update/"+pUserId, {
      userName: userNameParam,
      passWord: passWordParam,
      contactNumber: contactNumberParam
    });
  }

  getUser(http,id) {
    return http.get('http://localhost:3000/users/' + id);
  }

  
}

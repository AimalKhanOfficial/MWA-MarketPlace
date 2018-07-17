import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpService: HttpService) { }

  getAllUsers(callback) {
    this.httpService.findAllUsers().subscribe(list => {
      if (list !== null) {
        return callback(null, list.json());
      } else {
        return callback("Not Found", null);
      }
    });
  }
}

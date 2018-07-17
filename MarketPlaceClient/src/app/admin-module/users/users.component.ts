import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.retrieveUsersList();
  }

  retrieveUsersList() {
    this.usersService.getAllUsers((err, list) => {
      if (!err) {
        this.users = list;
        console.log(this.users);
      } else {
        console.log(err);
      }
    });
  }
}

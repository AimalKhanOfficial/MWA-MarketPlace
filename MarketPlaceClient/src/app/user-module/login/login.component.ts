import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [FormBuilder]
})
export class LoginComponent implements OnInit {
  
  loginRes = "";

  loginFormGroup: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private loginService: LoginService) {
    this.loginFormGroup = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    let loginPromise = this.loginService.loginUser(this.http, this.loginFormGroup.value.email, this.loginFormGroup.value.password);
    loginPromise.subscribe(res => {
      if (!res.auth) {
        this.loginRes = "Invalid username or password";
      } else {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(JSON.stringify(res.token));
      }

    });
  }

}

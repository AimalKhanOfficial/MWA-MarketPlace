import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { store } from '../../redux-store/store';
import { onUserLogin } from '../../redux-store/actions/loginAction';

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
        
        //Storing the token for communication with API
        localStorage.setItem('jwToken', res.token);
        
        //Setting the details logged in user
        store.dispatch(onUserLogin(decodedToken));

        //We can fetch the state of a logged in user by:
        //console.log(store.getState().userReducer);
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CheckExistingEmailService } from '../../services/check-existing-email.service';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [FormBuilder]
})
export class RegisterComponent implements OnInit {
  emailExists = "";
  registerationForm: FormGroup;
  registrationStatus = "";
  emailExistsFlag = true;

  constructor(private fb: FormBuilder, private http: HttpClient, private checkEmailService: CheckExistingEmailService, private registrationService: RegisterService) {
    this.registerationForm = fb.group({
      'userName': ['', Validators.required],
      'passWord': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'contactNumber': ['', Validators.compose([Validators.required])]
    });


    this.registerationForm.get('email').valueChanges.pipe(
      debounceTime(450)
    ).subscribe(s => {
      checkEmailService.checkEmail(http, s)
        .subscribe(
          res => {
            if (res == "true") {
              //this.registerationForm.controls['email'].setErrors({ 'incorrect': true });
              this.emailExistsFlag = false;
              this.emailExists = "Email Already Exists!";
            }
            else {
              this.emailExistsFlag = true;
              this.emailExists = "";
              //this.registerationForm.controls['email'].setErrors(null);
            }
          }
        );
    });

  }

  ngOnInit() {
  }

  onSubmit() {
    let res = this.registrationService.register(this.http, this.registerationForm.value.userName, this.registerationForm.value.passWord, this.registerationForm.value.email, this.registerationForm.value.contactNumber);
    console.log(res);
    res.subscribe(finalres => {
      console.log(finalres);
      if (finalres === "Registration successful!") {
        this.registrationStatus = "Registration Successful, check your email for verification code!";
      }
      else {
        alert("Something went wrong, try again later!");
      }
    });
  }
}

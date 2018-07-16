import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CheckExistingEmailService } from '../../services/check-existing-email.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
  providers: [FormBuilder]
})
export class ForgetPasswordComponent implements OnInit {
  emailExistsFlag = true;
  emailExists = "";
  finalResMsg = "";
  forgotPasswordForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private checkEmailService: CheckExistingEmailService) {
    this.forgotPasswordForm = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])]
    });

    this.forgotPasswordForm.get('email').valueChanges.pipe(
      debounceTime(450)
    ).subscribe(s => {
      checkEmailService.checkEmail(http, s)
        .subscribe(
          res => {
            if (res == "true") {
              this.emailExistsFlag = true;
              this.emailExists = "Exists!";
            }
            else {
              this.emailExists = "No registration found, please sign up!";
              this.emailExistsFlag = false;
            }
          }
        );
    });
  }

  ngOnInit() {
  }



  onSubmit() {
    let res = this.checkEmailService.updatePassword(this.http, this.forgotPasswordForm.value.email);
    res.subscribe(finalRes => {
      if (finalRes === "Password Change successful!") {
        this.finalResMsg = "Your password has been updated, please check your inbox for new password!";
      }
      else {
        alert("Something went wrong, try again later!");
      }
    });
  }

}

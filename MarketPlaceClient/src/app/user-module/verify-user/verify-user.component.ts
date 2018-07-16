import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { VerifyUserService } from '../../services/verify-user.service';
import { store } from '../../redux-store/store';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {
  verificationStatus = "";
  userVerificationForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private userVerificationService: VerifyUserService) {
    this.userVerificationForm = fb.group({
      'verificationCode': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  onSubmit() {
    if(this.userVerificationForm.value.verificationCode == store.getState().userReducer.verificationCode){
      this.userVerificationService.verifyUser(this.http, store.getState().userReducer.email).subscribe(res => {
        if(res === "Verification successful!"){
          this.verificationStatus = "Verification Successful!";
        }
        else {
          alert("Something went wrong, try again later!");
        }
      });
    }
    else {
      this.verificationStatus = "Verification Code does not match!";
    }
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from '../services/register.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-profileupdate',
  templateUrl: './profileupdate.component.html',
  styleUrls: ['./profileupdate.component.css'],
  providers: [FormBuilder]
})

export class ProfileupdateComponent implements OnInit {

  geolocationPosition;
  registerationForm: FormGroup;
  registrationStatus = "";

  id;

  constructor(private fb: FormBuilder, private http: HttpClient, private registrationService: RegisterService, private router:Router) {
    this.registerationForm = fb.group({
      'userName': ['', Validators.required],
      'passWord': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      'contactNumber': ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {

   const userObj= JSON.parse(sessionStorage.getItem("loggedInUserDetails"));
   this.id=userObj._id;

    if (this.id) {

      console.log("yes")
      this.registrationService.getUser(this.http,this.id).subscribe((data) => {
        this.registerationForm.get('userName').setValue(data.title);
        this.registerationForm.get('passWord').setValue(data.price);
        this.registerationForm.get('contactNumber').setValue(data.condition);
      });

    }
    else {
      console.log("nno")

    }
  }

  onSubmit() {

    let res = this.registrationService.updateInfo(this.http, this.registerationForm.value.userName, this.registerationForm.value.passWord, this.registerationForm.value.contactNumber,this.id);
    console.log(res);
    res.subscribe(res => {

      this.router.navigate(['/user/posts']);
      
    });

  }

}

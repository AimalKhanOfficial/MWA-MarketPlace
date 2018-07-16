import { Component } from '@angular/core';
import { PostService } from '../services/PostService';
import { Fileupload } from '../services/Fileupload';


import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-postcreate',
  templateUrl: './postcreate.component.html',
  styleUrls: ['./postcreate.component.css']
})
export class PostcreateComponent {
  myForm: FormGroup;
  selectedFile: File;
  conditions = [{ key: 1, value: 'New' }, { key: 2, value: 'Used' }];
  categories = [{ key: 1, value: 'cars' }, { key: 2, value: 'devices' }];
  //status 1-not approved 2-available 3-sold
  constructor(private formBuilder: FormBuilder, private postService: PostService, private fileupload: Fileupload) {


    this.myForm = formBuilder.group({

      'title': ['', [Validators.required]],
      'price': ['', [Validators.required]],
      'condition': ['', [
        Validators.required]
      ],
      'category': ['', Validators.required],
      'is_New': ['', Validators.required],
      'image_urls': ['', Validators.required],
      'description': ['', Validators.required]

    });

    this.myForm.valueChanges.subscribe(
      (data: any) => console.log(data)
    );
  }

  onSubmit() {
    console.log("this.myForm.value.userData");

    var obj = {
      "title": this.myForm.value.title, "price": this.myForm.value.price,
      "condition": this.myForm.value.condition, "category": this.myForm.value.category,
      "is_New": this.myForm.value.is_New,
      "description": this.myForm.value.description,
      "location": { "coordinates": [12.312213, 23.34223423], "s_type": "point" },
      "last_updated": new Date, "status": 1,
      "isDeleted": false, "user_id": 12,
      "user_name": "user name",
      "contact_number": "5349",
      "post_date": new Date,
      "image_urls": [this.myForm.value.image_urls, "car2.png"],
    };


    this.postService.addPost(obj).then((data) => {

      console.log(data)

    }).catch((err) => {

      console.log(err)
    });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    // upload code goes here

    // const uploadData = new FormData();
    // uploadData.append('myFile', this.selectedFile, this.selectedFile.name);

    this.fileupload.upload(this.selectedFile);
  }

  exampleValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Example') {
      return { example: true };
    }
    return null;
  }


}

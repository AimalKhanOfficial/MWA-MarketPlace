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
  conditions = [{ key: 1, value: 'New' }, { key: 2, value: 'Used' }];
  categories = [{ key: 1, value: 'cars' }, { key: 2, value: 'devices' }];
  //status 1-not approved 2-available 3-sold
  filesToUpload: Array<File>;
  uploadStatus;
  newImagesNames: String[] = [];

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
      'description': ['', Validators.required],
      "myvalidator": ['', Validators.required]


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
      "image_urls":  this.newImagesNames
    };


    this.postService.addPost(obj).then((data) => {

      console.log(data)

    }).catch((err) => {

      console.log(err)
    });
  }

  onFileChanged(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    this.uploadStatus="";
  }

  onUpload() {
    // upload code goes here
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log(files);

    for (let i = 0; i < files.length; i++) {

      let imgName= this.guid() + "." + files[i].name.split('.')[1];
      this.newImagesNames.push(imgName);

      formData.append("uploads[]", files[i],imgName);
    }
    console.log('form data variable :   ' + formData.toString());

    this.fileupload.upload(formData).subscribe((res)=>{
      this.myForm.get('myvalidator').setValue("sdfsd");
      this.uploadStatus="Done";
    });
  }
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  exampleValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Example') {
      return { example: true };
    }
    return null;
  }


}

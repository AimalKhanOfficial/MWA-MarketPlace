import { Component } from '@angular/core';
import { PostService } from '../services/PostService';

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
  conditions=[{key:1,value:'New'},{key:2,value:'Used'}];
  categories=[{key:1,value:'cars'},{key:2,value:'devices'}];

  constructor(private formBuilder: FormBuilder, private postService: PostService) {


    this.myForm = formBuilder.group({
     
        'title': ['product', [Validators.required]],
        'price': ['130', [Validators.required]],
        'condition': ['', [
          Validators.required]
        ],
        'category': ['', Validators.required],
        'is_New': ['', Validators.required],
        'image_urls': ['img', Validators.required],
        'description': ['', Validators.required]
      
    });

    this.myForm.valueChanges.subscribe(
      (data: any) => console.log(data)
    );
  }

  onSubmit() {
    console.log("this.myForm.value.userData");

    var obj = {
      "title": this.myForm.value.userData.title, "price": this.myForm.value.userData.price,
      "condition": this.myForm.value.userData.condition, "category": this.myForm.value.userData.category,
      "is_New": this.myForm.value.userData.is_New, "image_urls": this.myForm.value.userData.price,
      "description": this.myForm.value.userData.description, "post_date": this.myForm.value.userData.post_date
    };

    this.postService.addPost(obj).then((data) => {

      console.log(data)

    }).catch((err) => {

      console.log(err)
    });
  }

  exampleValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Example') {
      return { example: true };
    }
    return null;
  }


}

import { Component, OnInit } from '@angular/core';
import { PostListService } from '../services/post.list.service';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Post } from '../entities/post';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-detailposts',
  templateUrl: './posts.detail.component.html',
  styleUrls: ['./post.details.component.css']
})
export class PostsDetailComponent implements OnInit {
  listForm: FormGroup;
  isSelected = false;
  selectedPost: Post = new Post();

  constructor(private postListService: PostListService, private router: Router, private activRoute: ActivatedRoute) {
  }

  ngOnInit() {
    let id = this.activRoute.snapshot.paramMap.get("id");
    this.postListService.getPostById(id, (err, data) => {
      if (!err) {
        this.selectedPost = data;
        this.isSelected = true;
      } else {
        console.log("ERROR get Post .........." + err);
      }
    });
    // this.activRoute.paramMap.subscribe(params => {
    //   this.postListService.getPostById(params.get('id'), (err, data) => {        
    //   });
    // })
  }
}
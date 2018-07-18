import { Component, OnInit } from '@angular/core';
import { PostListService } from '../../services/post.list.service';
import { PostService } from '../../services/PostService';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-approve-posts',
  templateUrl: './approve-posts.component.html',
  styleUrls: ['./approve-posts.component.css']
})
export class ApprovePostsComponent implements OnInit {
  posts: any[];
  activationResponse = "";

  constructor(private postListService: PostListService, private postService: PostService, private router: Router) { }

  activatePost(id: string) {
    console.log(id);
    this.postService.activatePost(id)
      .then(function (response) {
        console.log(response);
        this.activationResponse = response;
        this.initializePostList();

      })
      .catch(function (error) {
        console.log(error);
      });
  }
  ngOnInit() {
    this.initializePostList();
  }

  initializePostList() {
    this.postListService.getAllAdminPosts((err, list) => {
      if (!err) {
        this.posts = list;

      } else {
        console.log(err);
      }
    });
  }


}

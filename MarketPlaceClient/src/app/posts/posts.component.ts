import { Component, OnInit } from '@angular/core';
import { PostListService } from '../services/post.list.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any[];

  constructor(private postListService: PostListService) { }

  ngOnInit() {
    this.initializePostList();
  }

  initializePostList() {
    this.postListService.getAllPosts((err, list) => {
      if (!err) {
        this.posts = list;
      } else {
        console.log(err);
      }
    });
  }
}
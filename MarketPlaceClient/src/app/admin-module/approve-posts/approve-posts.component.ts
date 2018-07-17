import { Component, OnInit } from '@angular/core';
import { PostListService } from '../../services/post.list.service';
import { PostService } from '../../services/PostService';

@Component({
  selector: 'app-approve-posts',
  templateUrl: './approve-posts.component.html',
  styleUrls: ['./approve-posts.component.css']
})
export class ApprovePostsComponent implements OnInit {
  posts: any[];
  constructor(private postListService: PostListService, private postService: PostService) { }

  activatePost(id: string) {
    console.log(id);
    this.postService.activatePost(id);
  }
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

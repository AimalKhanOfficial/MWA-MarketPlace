import { Component, OnInit } from '@angular/core';
import { PostListService } from '../../services/post.list.service';
import { PostService } from '../../services/PostService';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-approve-posts',
  templateUrl: './approve-posts.component.html',
  styleUrls: ['./approve-posts.component.css']
})
export class ApprovePostsComponent implements OnInit {
  posts: any[];

  constructor(private postListService: PostListService, private postService: PostService, private router: Router) { }

  activatePost(id: string) {
    console.log(id);
    this.postService.activatePost(id)
      .pipe(
        map((res: Response) => res.json())
      ).subscribe(data => {
        if (data === "Post Activated") {
          this.ngOnInit();

        }
      }
      )
  }
  ngOnInit() {
    this.postListService.getAllAdminPosts((err, list) => {
      if (!err) {
        this.posts = list;

      } else {
        console.log(err);
      }
    });
  }


}

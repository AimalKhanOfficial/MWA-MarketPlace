import { Component, OnInit } from '@angular/core';
import { PostsComponent } from '../posts/posts.component';
import { PostsDetailComponent } from '../posts/posts.details.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

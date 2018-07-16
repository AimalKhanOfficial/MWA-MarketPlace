import { Component, OnInit } from '@angular/core';
import { PostListService } from '../services/post.list.service';
import {MatTableDataSource} from '@angular/material';
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  listForm: FormGroup;
  ELEMENT_DATA: any[] =[];
  posts: any[];
  dataSource ;
  displayedColumns: string[] = ['title', 'description', 'price', 'user_name',"actions"];

  constructor(private postListService: PostListService) { }

  ngOnInit() {
    this.initializePostList();
  }

  initializePostList() {
    this.postListService.getAllPosts((err, list) => {
      if (!err) {
        this.posts = list;
        this.ELEMENT_DATA = list;
        this.dataSource  = new MatTableDataSource(this.ELEMENT_DATA);
      } else {  
        console.log(err);
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
import { Component, OnInit, ViewChild } from '@angular/core';
import { PostListService } from '../services/post.list.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import { Post } from '../entities/post';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
@Injectable()
export class PostsComponent implements OnInit {
  listForm: FormGroup;
  ELEMENT_DATA: any[] =[];
  // posts: Post[];
  dataSource ;
  isSelected = false;
  displayedColumns: string[] = ['image_urls', 'title', 'description', 'price', 'user_name', 'condition', "actions"];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // selectedPost:Post = new Post();

  // onSelect(myPost: Post):void{
  //   this.selectedPost = myPost;
  //   this.isSelected = true;
  // }
  constructor(private postListService: PostListService) { }

  ngOnInit() {
    this.initializePostList();
    
  }

  initializePostList() {
    this.postListService.getAllPosts((err, list) => {
      if (!err) {
        // this.posts = list;
        this.ELEMENT_DATA = list;
        this.dataSource  = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
      } else {  
        console.log(err);
      }
    });
  }

  onDelete(id) {
    this.postListService.removePost(id, (err, data) => {
      if(!err) {
        this.initializePostList();
      } else {
        console.log(err);
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class PostListService {

    constructor(private httpService: HttpService) { }

    getAllPosts(callback) {
        this.httpService.findAllPosts().subscribe(list => {
            if (list !== null) {
                return callback(null, list.json());
            } else {
                return callback("Not Found", null);
            }
        });
    }
    getAllAdminPosts(callback) {
        this.httpService.findAllAdminPosts().subscribe(list => {
            if (list !== null) {
                return callback(null, list.json());
            } else {
                return callback("Not Found", null);
            }
        });
    }
    getPostById(id, callback) {
        this.httpService.findPostById(id).subscribe(post => {
            if (post !== null) {
                return callback(null, post.json());
            } else {
                return callback("Not Found", null);
            }
        });
    }

    removePost(id: string, callback) {
        this.httpService.deletePost(id).subscribe(data => {
            if (data !== null && data !== undefined && data !== {}) {
                return callback(null, data);
            } else {
                return callback("Error", null);
            }
        });
    }

}
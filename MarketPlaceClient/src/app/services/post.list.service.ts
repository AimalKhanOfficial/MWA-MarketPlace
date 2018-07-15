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
}
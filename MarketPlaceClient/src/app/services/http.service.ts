import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private url = 'http://localhost:3000/api';

    constructor(public http: HttpClient) {
    }

    findAllPosts(): Observable<any> {
        return this.http.get(this.url + "/posts");
    }
    findAllAdminPosts(): Observable<any> {
        return this.http.get(this.url + "/adminPosts");
    }
    findPostById(id): Observable<any> {
        return this.http.get(this.url + "/posts/" + id);
    }

    deletePost(id): Observable<any> {
        return this.http.delete(this.url + "/posts/" + id);
    }

    findAllUsers(): Observable<any> {
        return this.http.get(this.url + "/users");
    }

}
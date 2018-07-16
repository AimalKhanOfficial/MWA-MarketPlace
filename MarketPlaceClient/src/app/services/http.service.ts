import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private url = 'http://localhost:3000/api';

    constructor(public http: Http) {
    }

    findAllPosts(): Observable<any> {
        return this.http.get(this.url + "/posts");
    }
    
    findPostById(id): Observable<any> {
        return this.http.get(this.url + "/posts/" + id);
    }
}
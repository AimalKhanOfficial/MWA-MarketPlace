import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class HttpService {

    private url = 'http://localhost:3000';

    constructor(public http: Http) {
    }

    findAllPosts(): Observable<any> {
        return this.http.get(this.url + "/posts");
    }
}
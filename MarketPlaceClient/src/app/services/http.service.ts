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
<<<<<<< HEAD

    findAllUsers(): Observable<any> {
        return this.http.get(this.url + "/users");
=======
    
    findPostById(id): Observable<any> {
        return this.http.get(this.url + "/posts/" + id);
>>>>>>> df8a924327f5e8ba2eaa413e074e015ee43312ef
    }
}
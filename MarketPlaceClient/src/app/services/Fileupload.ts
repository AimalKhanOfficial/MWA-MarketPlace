import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class Fileupload {
  constructor(private http: HttpClient) { }

  upload(uploadData) {
    return this.http.post('http://localhost:3000/imgapi/file-upload', uploadData)
  }

  private extractData(res) {
    let body = res.json();
    return body || {};
  }
  private handleErrorPromise(error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }

}
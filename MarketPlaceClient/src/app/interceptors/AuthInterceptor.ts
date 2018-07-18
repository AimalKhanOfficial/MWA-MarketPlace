import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = sessionStorage.getItem("token");
        console.log("Inside Interceptor", token);
        if (token != null) {
            if (req.url != "http://localhost:3000/imgapi/file-upload") {
                req = req.clone({
                    setHeaders: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
            }

        }
        return next.handle(req);
    }
}
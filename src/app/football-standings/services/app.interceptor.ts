import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '@env/environment';

@Injectable()
export class Interceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = environment.token;
        if (token) {
            const reqWithToken = req.clone({headers: req.headers.append("X-Auth-Token", token)});
            return next.handle(reqWithToken);
        }
        return next.handle(req);
    }
}

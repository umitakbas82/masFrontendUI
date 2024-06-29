import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
constructor(private route:Router){}
  
        intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            const token = localStorage.getItem("token");
            if (token) {
              
                request = request.clone({ headers: request.headers.set('Authorization', 'Bearer '+ token) });
                request = request.clone({ headers: request.headers.set('deviceType', 'WEB-APP') });
            }
    
            if (!request.headers.has('Content-Type')) {
                
            }
    
            request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    
            return next.handle(request).pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                                         }
                    return event;
                }),
                catchError((error: HttpErrorResponse) => {
                    let data = {};
                    data = {
                        reason: error && error.error && error.error.reason ? error.error.reason : '',
                        status: error.status
                    };
                     if(error.status===401)
                     {                      

                        this.route.navigate(['login']);
                     }
                    return throwError(error);
                }));
        }
    }
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RequestInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let key=sessionStorage.getItem('key');
    let userLogged=JSON.parse(sessionStorage.getItem("user"));
    if(key!=undefined)
      request = request.clone({
        setHeaders: {
          Username: userLogged.username,
          Authorization: key
        }
      });
    return next.handle(request);
  }

}

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class IntercepterService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //Get the auth token from the service
    let authToken = "";

    if (localStorage.getItem('nguoiDungDangNhap')) {
      const user = JSON.parse(localStorage.getItem("nguoiDungDangNhap") as string);
      authToken = `Bearer ${user.accessToken}`;
    }

    const header = new HttpHeaders()
      .set('access-token', authToken)
      .set('Authorization', authToken)
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization
    const authReq = request.clone(
      {
        // headers: request.headers.set("Authorization", authToken),
        headers: header
      }
    );

    // send cloned request with header to the next handler;
    return next.handle(authReq);

  }
}

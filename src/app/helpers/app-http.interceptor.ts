//import { Injectable } from '@angular/core';
//import { Store, select } from '@ngrx/store';
//import { Observable, throwError } from 'rxjs';
//import { tap, finalize, take, catchError } from 'rxjs/operators';
//import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
//import { AppState } from './../app/state/';
//import {
//  HttpEventStartAction,
//  HttpEventEndAction,
//  LogOutAction,
//  SetHttpErrorAction
//} from './../app/state/actions';
//import { environment } from 'src/environments/environment';
//import { CryptoLibrary } from '.';
//import { authAccessToken } from 'src/app/auth/state/reducers';
//
//
//@Injectable()
//export class AppHttpInterceptor implements HttpInterceptor {
//
//  constructor(private store: Store<AppState>, private crypt: CryptoLibrary) {
//  }
//  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//    this.store.dispatch(HttpEventStartAction());
//    // Clone httRequest and set headers
//    const requestToHandle = request.clone({
//      headers: this.getHeaders(request),
//      // withCredentials: true
//    });
//    // Execute http request
//    //console.log(requestToHandle)
//    return next.handle(requestToHandle).pipe(
//      tap(() => { }),
//      catchError((err: any, caught: Observable<any>) => {
//        // Check Session expired
//        if (err.status === 401) {
//          //console.log(err)
//          this.store.pipe(select(state => state.user.userInfo)).pipe(take(1)).subscribe((res) => {
//            //console.log(res)
//            this.store.dispatch(LogOutAction());
//          });
//        }
//
//        // Only dispatch erros when status not 403,400
//        if (![403, 400].includes(err.status)) {
//          this.store.dispatch(SetHttpErrorAction(err));
//        }
//        const info = Object.assign(err, {});
//        // //console.log('Info: ', JSON.parse(this.service.decrypt(info.error.text)))
//        // info.error.text = JSON.parse(this.service.decrypt(info.error.text));
//        return throwError(info);
//      }),
//      finalize(() => {
//        this.store.dispatch(HttpEventEndAction());
//      }),
//    );
//  }
//
//  /**
//   * Get request headers
//   * HttpRequest request
//   * return HttpHeaders
//   */
//  private getHeaders(request: HttpRequest<any>): HttpHeaders {
//    // Set default headers
//    let headers: HttpHeaders = request.headers;
//    // Get current store app state values
//    try {
//      authAccessToken
//      let user = this.store.pipe(take(1), select(state => state.auth)).subscribe(info => {
//        if (info) {
//          headers = new HttpHeaders({
//            Accept: '*/*',
//            timeout: '15000',
//            Authorization: `Bearer ${(info && info.accessToken) ? info.accessToken : 'guest'}`
//          })
//        } else {
//          headers = new HttpHeaders({
//            Accept: '*/*',
//            timeout: '15000',
//            Authorization: `Bearer guest`
//          })
//        }
//      });
//      //console.log(headers)
//      return headers;
//    } catch (ex) {
//      return headers;
//    }
//  }
//}
//
//

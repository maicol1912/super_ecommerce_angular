//import { Injectable } from '@angular/core';
//import { Store, select } from '@ngrx/store';
//import { Observable, throwError } from 'rxjs';
//import { tap, finalize, take, catchError } from 'rxjs/operators';
//import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
//import {AppState} from "../state";
//import {CryptoLibrary} from "./crypto.library";
//import {AuthActions, HttpEventEndAction, HttpEventStartAction, SetHttpErrorAction} from "../state/actions";
//import {selectAccessToken} from "../state/reducers";
//
//
//
//@Injectable()
//export class AppHttpInterceptor implements HttpInterceptor {
//
//  constructor(private store: Store<AppState>, private crypt: CryptoLibrary) {
//  }
//
//  /**
//   * Intercept all HTTP methods to get and set X-CSRF tokens
//   * HttpRequest<any> request
//   * HttpHandler next
//   * return Observable
//   */
//  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//    this.store.dispatch(HttpEventStartAction());
//    const requestToHandle = request.clone({
//      headers: this.getHeaders(request),
//      // withCredentials: true
//    });
//    return next.handle(requestToHandle).pipe(
//      tap(() => { }),
//      catchError((err: any, caught: Observable<any>) => {
//        if (err.status === 401) {
//          this.store.pipe(select(state => state.auth.result)).pipe(take(1)).subscribe((res) => {
//            this.store.dispatch(AuthActions.LogoutAction());
//          });
//        }
//        if (![403, 400].includes(err.status)) {
//          this.store.dispatch(SetHttpErrorAction(err));
//        }
//        const info = Object.assign(err, {});
//        return throwError(info);
//      }),
//      finalize(() => {
//        this.store.dispatch(HttpEventEndAction());
//      }),
//    );
//  }
//
//  private getHeaders(request: HttpRequest<any>): HttpHeaders {
//    let headers: HttpHeaders = request.headers;
//    try {
//      selectAccessToken
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
//      return headers;
//    } catch (ex) {
//      return headers;
//    }
//  }
//}
//

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {PageResources} from "../../helpers/page-resources";
import {AuthService} from "../services/auth.service";
import {map, Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {selectAccessToken} from "../../state/reducers";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private http: HttpClient, private router: Router,
              private store:Store,
              private readonly authService:AuthService) {}

   canActivate(): Observable<boolean> {
     let token;
     this.store.select(selectAccessToken).subscribe((value) => {
       token = value;
     });
    if (!token) {
      this.router.navigate([PageResources.login]);
      return of(false);
    }
     return this.authService.checkJwt(token).pipe(
       map((response: boolean) => {
         if (!response) {
           this.router.navigate([PageResources.login]);
           return false;
         }
         return true;
       }),
       catchError(() => {
         this.router.navigate([PageResources.login]);
         return of(false);
       })
     );

   }

}

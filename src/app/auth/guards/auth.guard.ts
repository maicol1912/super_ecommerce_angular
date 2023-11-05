import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {PageResources} from "../../helpers/page-resources";
import {AuthService} from "../services/auth.service";
import {map, Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private http: HttpClient, private router: Router,
              private readonly authService:AuthService) {}

   canActivate(): Observable<boolean> {
    const token = localStorage.getItem('_digi_user');
    if (!token) {
      this.router.navigate([PageResources.login]);
      return of(false);
    }
     const tokenFormatted = token.replace(/"/g, '');
     return this.authService.checkJwt(tokenFormatted).pipe(
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

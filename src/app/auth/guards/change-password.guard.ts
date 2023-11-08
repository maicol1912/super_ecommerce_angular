import { Injectable } from '@angular/core';
import {ActivatedRoute, CanActivate, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {PageResources} from "../../helpers/page-resources";
import {AuthService} from "../services/auth.service";
import {map, Observable, of, Subscription} from "rxjs";
import {catchError} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {CryptoLibrary} from "../../helpers/crypto.library";

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordGuard implements CanActivate {
  private subscription: Subscription | null = null;
  constructor(private http: HttpClient, private router: Router,
              private store:Store,
              private readonly authService:AuthService,
              private readonly route: ActivatedRoute) {}

  canActivate(): Observable<boolean> {
    try{
      let token = '';

      this.subscription = this.route.paramMap.subscribe((params) => {
        token = params.get('token') ?? ''
        console.log(token);
      });
      console.log(token)
      return of(true)
    }
    catch (error:any){
      this.router.navigate([PageResources.login]);
      return of(false)
    }


  }

}

import { Injectable } from '@angular/core';
import {BaseService} from "../../services/base.service";
import {ApiResources} from "../../helpers/api.resources";
import {SwalService} from "../../services/swal.service";
import {map, Observable, of} from "rxjs";
import {ApiCode, ApiMessage} from "../../shared/utility";
import {catchError} from "rxjs/operators";
import {LocalResources} from "../../helpers/local.resources";
import {CryptoLibrary} from "../../helpers/crypto.library";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {PageResources} from "../../helpers/page-resources";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService{

  constructor(httpClient: HttpClient,private readonly router:Router,private readonly activatedRoute: ActivatedRoute) {
    super(httpClient);
  }
  login(user:any){
    return this.httpPost(ApiResources.login, user).pipe(
      map((response: any) => {
        if (!response.success) {
          if(response.statusCode == ApiCode.UNAUTHORIZED){
              SwalService.openErrorAlert(ApiMessage.UNAUTHORIZED,ApiMessage.UNAUTHORIZED)
            return null;
          }
          if(!response.success && response.statusCode == ApiCode.SUCCESS){
            return response
          }
          SwalService.openErrorAlert(ApiMessage.INTERNAL_ERROR,ApiMessage.INTERNAL_ERROR)
          return null;
        }
          window.localStorage.setItem(
              LocalResources.AuthTokenLocal,
              CryptoLibrary.encrypt(JSON.stringify(response.result.token))
          );
          window.localStorage.setItem(
            LocalResources.UserLocal,
            CryptoLibrary.encrypt(JSON.stringify(response.result.user))
          );
        SwalService.openInfoAlert("Login exitoso","Se inicio sesion correctamente");
        return response;
      })
    );
  }

  resendOtpCode(email:string){
    const emailParsed = email.replace(/"/g, '')
    return this.httpGet(ApiResources.sendOtpCode(emailParsed)).pipe(
      map((response: any) => {
        if(response.success){
          this.router.navigate([PageResources.validateEmail])
          return response
        }
      })
    );
  }
  signup(user:any){
    return this.httpPost(ApiResources.signup, user).pipe(
      map((response: any) => {
        if (!response.success) {
          if(response.statusCode == ApiCode.UNAUTHORIZED){
            SwalService.openErrorAlert(ApiMessage.UNAUTHORIZED,ApiMessage.UNAUTHORIZED)
            return null;
          }
          SwalService.openErrorAlert(ApiMessage.INTERNAL_ERROR,ApiMessage.INTERNAL_ERROR)
          return null;
        }
        window.localStorage.setItem(
          LocalResources.UserLocal,
          CryptoLibrary.encrypt(JSON.stringify(response.result.user))
        );
        SwalService.openInfoAlert("Registro exitoso","Ahora verifica tu correo por medio del codigo otp enviado");
        return response;
      })
    );
  }

  verifyEmail(otp:any){
    const emailLogged = this.getEmailLogged()
    if(!emailLogged){
      return of(null)
    }
    return this.httpGet(ApiResources.verifyEmail(otp,emailLogged.replace(/"/g, ''))).pipe(
      map((response: any) => {
        if(response && response.success) {
          this.router.navigate([PageResources.login])
        }
        return response;
      })
    );
  }

  forgotPassword(email:any){
    if(!email){
      return of(null)
    }
    return this.httpGet(ApiResources.forgotPassword(email)).pipe(
      map((response: any) => {
        if(response && response.success) {
          this.router.navigate([PageResources.login])
        }
        return response;
      })
    );
  }

  sendChangePassword(email:any){
    if(!email){
      return of(null)
    }
    try {
      return this.httpGet(ApiResources.sentChangePassword(email)).pipe(
        map((response: any) => {
          if(response && response.success) {
            return response;
          }
          return of(null)
        })
      );
    } catch (error) {
      return of(null);
    }

  }

  changePassword(user:any){
    if(!user){
      return of(null)
    }
    const snapshot = this.activatedRoute.snapshot;
    const token = snapshot.params['token']
    if(!token){
      return of(null)
    }
    const tokenNotHashed = CryptoLibrary.decrypt(token)
    if(tokenNotHashed !== user.email){
      return of(null)
    }
    try {
      const messageDecrypt = CryptoLibrary.decrypt(token);
      if(!messageDecrypt){
        return of(null)
      }
      return this.httpPatch(ApiResources.changePassword(user.email,token),user).pipe(
        map((response: any) => {
          if(response && response.success) {
            this.router.navigate([PageResources.listProducts])
          }
          return response;
        })
      );
    } catch (error) {
      return of(null);
    }

  }
  logout(user:any){
        return this.httpPost(ApiResources.login, user).pipe(
            map((response: any) => {
                if (!response.success) {
                    SwalService.openErrorAlert(ApiMessage.INTERNAL_ERROR,ApiMessage.INTERNAL_ERROR)
                    return null;
                }
                window.localStorage.removeItem(
                  LocalResources.AuthTokenLocal
                );
                window.localStorage.removeItem(
                  LocalResources.UserLocal
                );
                return response;
            })
        );
    }

  checkJwt(token: any): Observable<boolean> {
    return this.httpGet(ApiResources.checkJwt, { jwt:token }).pipe(
      map((response: any) => {
        return response.statusCode == ApiCode.SUCCESS;
      }),
      catchError((error: any) => {
        return of(false);
      })
    );
  }

  getEmailLogged(){
    const emailLogged = window.localStorage.getItem(
      LocalResources.UserLocal,
    );
    if(!emailLogged){
      return null
    }
    console.log(CryptoLibrary.decrypt(emailLogged))
    return CryptoLibrary.decrypt(emailLogged).replace(/"/g, '')
  }
}

import { Injectable } from '@angular/core';
import {BaseService} from "../../services/base.service";
import {ApiResources} from "../../helpers/api.resources";
import {SwalService} from "../../services/swal.service";
import {map, Observable, of} from "rxjs";
import {ApiCode, ApiMessage} from "../../shared/utility";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService{


  login(user:any){
    return this.httpPost(ApiResources.login, user).pipe(
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
              '_digi_user',
              JSON.stringify(response.result.token)
          );
        SwalService.openInfoAlert("Login exitoso","Se inicio sesion correctamente");
        return response;
      })
    );
  }

    logout(user:any){
        return this.httpPost(ApiResources.login, user).pipe(
            map((response: any) => {
                if (!response.success) {
                    if(response.statusCode == ApiCode.UNAUTHORIZED){
                        SwalService.openErrorAlert(ApiMessage.UNAUTHORIZED,ApiMessage.UNAUTHORIZED)
                        return null;
                    }
                    SwalService.openErrorAlert(ApiMessage.INTERNAL_ERROR,ApiMessage.INTERNAL_ERROR)
                    return null;
                }
                window.localStorage.removeItem(
                    '_digi_user'
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
}

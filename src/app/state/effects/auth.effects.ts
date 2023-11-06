import { Injectable } from '@angular/core';
import { Actions, createEffect, EffectConfig, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActionTypes, AuthActions } from '../actions';
import { of } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import Swal from 'sweetalert2';
import {PageResources} from "../../helpers/page-resources";
@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store,
    private authService: AuthService
  ) { }

  LogIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.Login),
      map((action: any) => action.payload),
      switchMap((payload) => {
        return this.authService.login(payload).pipe(
          map((res) => {
            if (res && res.success) {
              const response = Object.assign({}, res);
              return AuthActions.LoginSuccessAction(response);
            }
            return AuthActions.LoginFailureAction({
              payload: {
                error: {
                  message:
                    res.error?.message ||
                    'Usuario o contraseña incorecta.',
                  error:
                    res.error || 'Usuario o contraseña incorecta.',
                },
              }
            });
          }),
          catchError((error) => {
            return of(AuthActions.LoginFailureAction({
              payload: {
                error: { message: 'Error inexperado, contacte con el administrador', error },
              }
            }));
          })
        )
      })
    )
  )

  LoginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    map((action: any) => action.payload),
    switchMap((payload) => {
      this.router.navigate([PageResources.listProducts]);
      return of(AuthActions.endOfAuthEvents(payload))
    }))
  );

  LoginFailure$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActionTypes.LoginFailure),
      map((action: any) => action.payload),
      switchMap((payload) => {
        Swal.fire({
          icon: 'error',
          title: 'Inicio de sesión fallido',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
        return of(AuthActions.endOfAuthEvents(payload))
      }))
    , { dispatch: false });

}

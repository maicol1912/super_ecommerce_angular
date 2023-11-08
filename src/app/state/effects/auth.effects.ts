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
import {selectAccessToken} from "../reducers";
import {ApiCode} from "../../shared/utility";
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
            console.log(res)
            if (res && res.success) {
              const response = Object.assign({}, res);
              return AuthActions.LoginSuccessAction({payload:response});
            }
            if(!res.success && res.statusCode == ApiCode.SUCCESS){
              console.log(payload)
              return AuthActions.ResendOtpCodeAction({payload:payload.email})
            }
            console.log("Entre en 4")
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

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.Logout),
            map((action: any) => action.payload),
            switchMap((payload) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Cierre de sesión exitoso',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
                this.router.navigate([PageResources.login]);
                return of(AuthActions.endOfAuthEvents(payload));
            })
        )
    );

  Signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.Signup),
      map((action: any) => action.payload),
      switchMap((payload) => {
        return this.authService.signup(payload).pipe(
          map((res) => {
            if (res && res.success) {
              const response = Object.assign({}, res);
              return AuthActions.SignupSuccessAction({payload:response});
            }
            return AuthActions.SignupFailureAction({
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
            return of(AuthActions.SignupFailureAction({
              payload: {
                error: { message: 'Error inexperado, contacte con el administrador', error },
              }
            }));
          })
        )
      })
    )
  )

  SignupSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.SignupSuccess),
    map((action: any) => action.payload),
    switchMap((payload) => {
      this.router.navigate([PageResources.validateEmail]);
      return of(AuthActions.endOfAuthEvents(payload))
    }))
  );

  SignupFailure$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActionTypes.SignupFailure),
      map((action: any) => action.payload),
      switchMap((payload) => {
        Swal.fire({
          icon: 'error',
          title: 'Creacion de usuario fallido',
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

  VerifyEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.VerifyEmail),
      map((action: any) => action.payload),
      switchMap((payload) => {
        console.log(payload)
        return this.authService.verifyEmail(payload).pipe(
          map((res) => {
            if (res && res.success) {
              const response = Object.assign({}, res);
              return AuthActions.VerifyEmailSuccessAction({payload:response});
            }
            return AuthActions.VerifyEmailFailureAction({
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
            return of(AuthActions.VerifyEmailFailureAction({
              payload: {
                error: { message: 'Error inexperado, contacte con el administrador', error },
              }
            }));
          })
        )
      })
    )
  )

  VerifyEmailFailure$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActionTypes.VerifyEmailFailure),
      map((action: any) => action.payload),
      switchMap((payload) => {
        Swal.fire({
          icon: 'error',
          title: 'Verificacion de correo fallida',
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

  VerifyEmailSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.VerifyEmailSuccess),
    map((action: any) => action.payload),
    switchMap((payload) => {
      Swal.fire({
        icon: 'success',
        title: 'Verificacion de correo exitosa',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      this.router.navigate([PageResources.login]);
      return of(AuthActions.endOfAuthEvents(payload))
    }))
  );


  ResendOtpCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.ResendOtpCode),
      map((action: any) => action.payload),
      switchMap((payload) => {
        return this.authService.resendOtpCode(payload).pipe(
          map((res) => {
            if (res && res.success) {
              const response = Object.assign({}, res);
              return AuthActions.ResendOtpCodeSuccessAction({payload:response});
            }
            return AuthActions.ResendOtpCodeFailureAction({
              payload: {
                error: {
                  message:
                    res.error?.message ||
                    'No se pudo enviar el codigo otp nuevamente',
                  error:
                    res.error || 'No se pudo enviar el codigo otp nuevamente.',
                },
              }
            });
          }),
          catchError((error) => {
            return of(AuthActions.ResendOtpCodeFailureAction({
              payload: {
                error: { message: 'Error inexperado, contacte con el administrador', error },
              }
            }));
          })
        )
      })
    )
  )

  ResendOtpCodeFailure$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActionTypes.ResendOtpCodeFailure),
      map((action: any) => action.payload),
      switchMap((payload) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al enviar codigo otp',
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

  ResendOtpCodeSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.ResendOtpCodeSuccess),
    map((action: any) => action.payload),
    switchMap((payload) => {
      Swal.fire({
        icon: 'success',
        title: 'Codigo otp reenviado con exito',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      return of(AuthActions.endOfAuthEvents(payload))
    }))
  );


  ForgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.ForgotPassword),
      map((action: any) => action.payload),
      switchMap((payload) => {
        return this.authService.forgotPassword(payload.email).pipe(
          map((res) => {
            if (res && res.success) {
              const response = Object.assign({}, res);
              return AuthActions.ForgotPasswordSuccessAction({payload:response});
            }
            return AuthActions.ForgotPasswordFailureAction({
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
            return of(AuthActions.VerifyEmailFailureAction({
              payload: {
                error: { message: 'Error inexperado, contacte con el administrador', error },
              }
            }));
          })
        )
      })
    )
  )

  ForgotPasswordFailure$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActionTypes.ForgotPasswordFailure),
      map((action: any) => action.payload),
      switchMap((payload) => {
        Swal.fire({
          icon: 'error',
          title: 'Cambio de contrasena fallida',
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

  ForgotPasswordSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.ForgotPasswordSuccess),
    map((action: any) => action.payload),
    switchMap((payload) => {
      Swal.fire({
        icon: 'success',
        title: 'Cambio de contrasena correcta, las credenciales fueron enviadas',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      this.router.navigate([PageResources.login]);
      return of(AuthActions.endOfAuthEvents(payload))
    }))
  );



  ChangePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.ChangePassword),
      map((action: any) => action.payload),
      switchMap((payload) => {
        return this.authService.changePassword(payload).pipe(
          map((res) => {
            if (res && res.success) {
              const response = Object.assign({}, res);
              return AuthActions.ChangePasswordSuccessAction({payload:response});
            }
            return AuthActions.ChangePasswordFailureAction({
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
            return of(AuthActions.ChangePasswordFailureAction({
              payload: {
                error: { message: 'Error inexperado, contacte con el administrador', error },
              }
            }));
          })
        )
      })
    )
  )

  ChangePasswordFailure$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActionTypes.ChangePasswordFailure),
      map((action: any) => action.payload),
      switchMap((payload) => {
        Swal.fire({
          icon: 'error',
          title: 'Cambio de contrasena fallida',
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

  ChangePasswordSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.ChangePasswordSuccess),
    map((action: any) => action.payload),
    switchMap((payload) => {
      Swal.fire({
        icon: 'success',
        title: 'Cambio de contrasena correcta',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      this.router.navigate([PageResources.listProducts]);
      return of(AuthActions.endOfAuthEvents(payload))
    }))
  );


  SendLinkChangePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.SendLinkChangePassword),
      map((action: any) => action.payload),
      switchMap((payload) => {
        return this.authService.sendChangePassword(payload.email).pipe(
          map((res) => {
            if (res && res.success) {
              const response = Object.assign({}, res);
              return AuthActions.SendLinkChangePasswordSuccessAction({payload:response});
            }
            return AuthActions.SendLinkChangePasswordFailureAction({
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
            return of(AuthActions.SendLinkChangePasswordFailureAction({
              payload: {
                error: { message: 'Error inexperado, contacte con el administrador', error },
              }
            }));
          })
        )
      })
    )
  )

  SendLinkChangePasswordFailure$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActionTypes.SendLinkChangePasswordFailure),
      map((action: any) => action.payload),
      switchMap((payload) => {
        Swal.fire({
          icon: 'error',
          title: 'envio de cambio de password fallida',
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

  SendLinkChangePasswordSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.SendLinkChangePasswordSuccess),
    map((action: any) => action.payload),
    switchMap((payload) => {
      Swal.fire({
        icon: 'success',
        title: 'Envio de cambio de password exitoso',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      this.router.navigate([PageResources.login]);
      return of(AuthActions.endOfAuthEvents(payload))
    }))
  );
}

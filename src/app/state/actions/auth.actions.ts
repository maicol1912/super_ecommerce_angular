import { createAction, props } from '@ngrx/store';
export enum AuthActionTypes{
  Login = '[Auth] Inicio de sesión',
  LoginSuccess = '[Auth] Inicio de sesión exitoso',
  LoginFailure = '[Auth] Inicio de sesión fallido',
  Logout = '[Auth] Cierre de sesión',
  Signup = '[Auth] creacion de usuario',
  SignupSuccess = '[Auth] Creacion de usuario exitosa',
  SignupFailure = '[Auth] Creacion de usuario fallida',
  VerifyEmail = '[Auth] verificar email',
  VerifyEmailSuccess = '[Auth] verificar email exitoso',
  VerifyEmailFailure = '[Auth] verificar email fallido',
  ResendOtpCode = '[Auth] reenviar codigo otp',
  ResendOtpCodeSuccess = '[Auth] reenviar codigo otp exitoso',
  ResendOtpCodeFailure = '[Auth] reenviar codigo otp fallido',


  SendLinkChangePassword = '[Auth] Enviar link cambio contraseña',
  SendLinkChangePasswordSuccess = '[Auth] Enviar link cambio de contraseña exitoso',
  SendLinkChangePasswordFailure = '[Auth] Enviar link cambio de contraseña fallido',

  ChangePassword = '[Auth] Cambiar contraseña',
  ChangePasswordSuccess = '[Auth] Cambio de contraseña exitoso',
  ChangePasswordFailure = '[Auth] Cambio de contraseña fallido',

  ForgotPassword = '[Auth] olvidar contraseña',
  ForgotPasswordSuccess = '[Auth] olvidar contraseña exitoso',
  ForgotPasswordFailure = '[Auth] olvidar contraseña fallido',

  FindUser = '[Auth] Buscando usuario',
  FindUserSuccess = '[Auth] Busqueda de usuario exitosa',
  FindUserFailure = '[Auth] Busqueda de usuario fallida',
  ValidateToken = '[Auth] Validar token',
  ValidateTokenSuccess = '[Auth] Validar token exitoso',
  ValidateTokenFailure = '[Auth] Validar token fallido',
  endOfAuthEvents = '[Auth] Finalizacion de eventos',
}

export const AuthActions = {
  LoginAction: createAction(AuthActionTypes.Login, props<{ payload: any }>()),
  LoginSuccessAction: createAction(AuthActionTypes.LoginSuccess, props<{ payload: any }>()),
  LoginFailureAction: createAction(AuthActionTypes.LoginFailure, props<{ payload: any }>()),

  SignupAction: createAction(AuthActionTypes.Signup, props<{ payload: any }>()),
  SignupSuccessAction: createAction(AuthActionTypes.SignupSuccess, props<{ payload: any }>()),
  SignupFailureAction: createAction(AuthActionTypes.SignupFailure, props<{ payload: any }>()),

  VerifyEmailAction: createAction(AuthActionTypes.VerifyEmail, props<{ payload: any }>()),
  VerifyEmailSuccessAction: createAction(AuthActionTypes.VerifyEmailSuccess, props<{ payload: any }>()),
  VerifyEmailFailureAction: createAction(AuthActionTypes.VerifyEmailFailure, props<{ payload: any }>()),

  ResendOtpCodeAction: createAction(AuthActionTypes.ResendOtpCode, props<{ payload: any }>()),
  ResendOtpCodeSuccessAction: createAction(AuthActionTypes.ResendOtpCodeSuccess, props<{ payload: any }>()),
  ResendOtpCodeFailureAction: createAction(AuthActionTypes.ResendOtpCodeFailure, props<{ payload: any }>()),

  LogoutAction: createAction(AuthActionTypes.Logout),

  ForgotPasswordAction: createAction(AuthActionTypes.ForgotPassword, props<{ payload: any }>()),
  ForgotPasswordSuccessAction: createAction(AuthActionTypes.ForgotPasswordSuccess, props<{ payload: any }>()),
  ForgotPasswordFailureAction: createAction(AuthActionTypes.ForgotPasswordFailure, props<{ payload: any }>()),

  ChangePasswordAction: createAction(AuthActionTypes.ChangePassword, props<{ payload: any }>()),
  ChangePasswordSuccessAction: createAction(AuthActionTypes.ChangePasswordSuccess, props<{ payload: any }>()),
  ChangePasswordFailureAction: createAction(AuthActionTypes.ChangePasswordFailure, props<{ payload: any }>()),

  SendLinkChangePasswordAction: createAction(AuthActionTypes.SendLinkChangePassword, props<{ payload: any }>()),
  SendLinkChangePasswordSuccessAction: createAction(AuthActionTypes.SendLinkChangePasswordSuccess, props<{ payload: any }>()),
  SendLinkChangePasswordFailureAction: createAction(AuthActionTypes.SendLinkChangePasswordFailure, props<{ payload: any }>()),

  FindUserAction: createAction(AuthActionTypes.FindUser, props<{ payload: any }>()),
  FindUserSuccessAction: createAction(AuthActionTypes.FindUserSuccess, props<{ payload: any }>()),
  FindUserFailureAction: createAction(AuthActionTypes.FindUserFailure, props<{ payload: any }>()),
  ValidateTokenAction: createAction(AuthActionTypes.ValidateToken, props<{ payload: any }>()),
  ValidateTokenSuccessAction: createAction(AuthActionTypes.ValidateTokenSuccess, props<{ payload: any }>()),
  ValidateTokenFailureAction: createAction(AuthActionTypes.ValidateTokenFailure, props<{ payload: any }>()),
  endOfAuthEvents: createAction(AuthActionTypes.endOfAuthEvents, props<{ payload: any }>()),
};

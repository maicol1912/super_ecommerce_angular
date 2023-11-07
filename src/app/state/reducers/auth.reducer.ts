import * as interfaces from '../interfaces';
import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {AuthActions} from "../actions/auth.actions";
import {cloneDeep} from "lodash";

export const initialAuthState: interfaces.AuthState = {
  isLoading: false,
  error: null,
  result: null,
  accessToken: null,
  user:null
};


export const AuthReducer = createReducer(
  initialAuthState,
  on(AuthActions.LoginAction, (state, payload) => ({ ...state, result:{...payload.payload},isLoading: true })),
  on(AuthActions.LoginSuccessAction, (state, payload) => ({ ...state, result:{...payload.payload.result},isLoading: false,accessToken:payload.payload?.result['token'],user:payload.payload?.result['user']})),
  on(AuthActions.LoginFailureAction, (state, payload) => ({ ...state, ...payload.payload.error,result: {...payload.payload.result},isLoading: false })),
  on(AuthActions.VerifyEmailAction, (state, payload) => ({ ...state,isLoading: true })),
  on(AuthActions.VerifyEmailSuccessAction, (state, payload) => ({ ...state,isLoading: false})),
  on(AuthActions.VerifyEmailFailureAction, (state, payload) => ({ ...state,...payload.payload.error,isLoading: false})),

  on(AuthActions.SignupAction, (state, payload) => ({ ...state, result:{...payload.payload},isLoading: true })),
  on(AuthActions.SignupSuccessAction, (state, payload) => ({ ...state, result:{...payload.payload.result},isLoading: false})),
  on(AuthActions.SignupFailureAction, (state, payload) => ({ ...state, ...payload.payload.error,result: {...payload.payload.result},isLoading: false })),
  on(AuthActions.LogoutAction, (state, payload) => (cloneDeep(initialAuthState))),
  on(AuthActions.FindUserAction, (state, payload) => ({ ...state, data: payload })),
  on(AuthActions.FindUserSuccessAction, (state, payload) => ({ ...state, data: payload })),
  on(AuthActions.FindUserFailureAction, (state, payload) => ({ ...state, data: payload })),

);

export const selectAuthFeatureState = createFeatureSelector<interfaces.AuthState>('auth');
export const selectAccessToken = createSelector(
  selectAuthFeatureState,
  (state: interfaces.AuthState) => state.accessToken
);

export const selectUserInformation = createSelector(
  selectAuthFeatureState,
  (state: interfaces.AuthState) => state
);


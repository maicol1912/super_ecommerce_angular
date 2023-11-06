import * as interfaces from '../interfaces';
import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {AuthActions} from "../actions/auth.actions";
import {cloneDeep} from "lodash";

export const initialAuthState: interfaces.AuthState = {
  isLoading: false,
  message: null,
  success: null,
  result: null,
  timestamps:null,
  statusCode:null,
  path:null,
  error:null
};


export const AuthReducer = createReducer(
  initialAuthState,
  on(AuthActions.LoginAction, (state, payload) => ({ ...state, data: payload })),
  on(AuthActions.LoginSuccessAction, (state, payload) => ({ ...state, ...payload, })),
  on(AuthActions.LoginFailureAction, (state, payload) => ({ ...state, data: payload })),
  on(AuthActions.LogoutAction, (state, payload) => (cloneDeep(initialAuthState))),
  on(AuthActions.FindUserAction, (state, payload) => ({ ...state, data: payload })),
  on(AuthActions.FindUserSuccessAction, (state, payload) => ({ ...state, data: payload })),
  on(AuthActions.FindUserFailureAction, (state, payload) => ({ ...state, data: payload })),

);

export const selectAuthFeatureState = createFeatureSelector<interfaces.AuthState>('auth');
export const selectAccessToken = createSelector(
  selectAuthFeatureState,
  (state: interfaces.AuthState) => state.result?.token
);


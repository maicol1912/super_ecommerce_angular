import { createAction, props } from '@ngrx/store';

export enum AppActionTypes {
  HttpStart = '[App] Inicio solicitud Http',
  HttpEnd = '[App] Finalización solicitud Http',
  HttpError = '[App] Error en solicitud Http',
}

export const HttpEventStartAction = createAction(AppActionTypes.HttpStart);
export const HttpEventEndAction = createAction(AppActionTypes.HttpEnd);
export const SetHttpErrorAction = createAction(AppActionTypes.HttpError, props<{ payload: any }>());

export const AppActions =[
  AppActionTypes,
  HttpEventStartAction,
  HttpEventEndAction,
  SetHttpErrorAction,
]

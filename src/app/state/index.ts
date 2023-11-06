import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import * as reducers from './reducers';
import * as interfaces from './interfaces';
import * as effects from './effects';
import * as localStorage from './localstorage';

export interface AppState {
  readonly auth: interfaces.AuthState;
}

export const AppReducers: ActionReducerMap<AppState> = {
  auth: reducers.AuthReducer,
};

// export const AppMetaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
export const AppMetaReducers: MetaReducer<AppState>[] = [
  localStorage.Auth,
];

export const AppEffects = [effects.AppEffects,effects.RouterEffects];

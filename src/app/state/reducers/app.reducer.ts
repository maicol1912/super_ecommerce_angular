import * as interfaces from '../interfaces';
import * as AppActions from '../actions/app.actions';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { ApplicationState } from '../interfaces';

export const initialApplicationState: interfaces.ApplicationState = {
  httpLoading: false,
  httpError: null,
};

export const applicationReducer = createReducer(
  initialApplicationState,
  on(AppActions.HttpEventEndAction, (state) => ({ ...state, httpLoading: false })),
  on(AppActions.SetHttpErrorAction, (state) => ({ ...state, httpError: "Error" })),
  on(AppActions.HttpEventStartAction, (state) => ({ ...state, httpLoading: true })),
);

export const httpLoading = (state: interfaces.ApplicationState) => state.httpLoading;
export const httpError = (state: interfaces.ApplicationState) => state.httpError;

const featureSelector = createFeatureSelector<ApplicationState>('application');

export const selectHttpLoading = createSelector(
  featureSelector,
  (AppData: interfaces.ApplicationState) => {
    return AppData.httpLoading
  },

);

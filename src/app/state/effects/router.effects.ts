import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import * as actions from '../actions';

@Injectable()
export class RouterEffects {

  cancelRequestsNavigation = createEffect(() => this.actions$.pipe(
    ofType(ROUTER_NAVIGATION, actions.AuthActionTypes.Logout)), { dispatch: false }
  );

  cancelRequest = createEffect(() => this.actions$.pipe(
    ofType(actions.AuthActionTypes.Logout)), { dispatch: false }
  );

  constructor(
    private actions$: Actions,
  ) { }
}

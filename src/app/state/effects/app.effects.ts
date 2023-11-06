import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {  of } from 'rxjs';
import { Router } from '@angular/router';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Store } from '@ngrx/store';

@Injectable()
export class AppEffects {
  httpError$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[App] Error en solicitud Http'),
      map(payload => ({ type: '[Movies API] Movies Loaded Success', payload: payload })),
      catchError(() => of({ type: '[Movies API] Movies Loaded Error' }))
    )
  )

  routerNavigation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION)
    ), { functional: true, dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store
  ) { }
}

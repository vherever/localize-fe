import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
// app imports
import { LoadLocalesAction, LoadLocalesFailureAction, LoadLocalesSuccessAction, LocalesActionTypes } from '../actions/locales.actions';

@Injectable()
export class LocalesEffects {
  loadLocales$ = createEffect(
    () => this.actions$
      .pipe(
        ofType<LoadLocalesAction>(LocalesActionTypes.LOAD_LOCALES),
        mergeMap(
          (data: any) => of(data)
            .pipe(
              map(() => {
                return new LoadLocalesSuccessAction(data.payload);
              }),
              catchError((error) => of(new LoadLocalesFailureAction(error))),
            ),
        ),
      ),
  );

  constructor(
    private actions$: Actions,
  ) {
  }
}

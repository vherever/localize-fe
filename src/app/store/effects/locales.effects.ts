import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocalesService } from '../../core/services/api-interaction/locales.service';
import { LoadLocalesAction, LoadLocalesFailureAction, LoadLocalesSuccessAction, LocalesActionTypes } from '../actions/locales.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class LocalesEffects {
  loadLocales$ = createEffect(
    () => this.actions$
      .pipe(
        ofType<LoadLocalesAction>(LocalesActionTypes.LOAD_LOCALES),
        mergeMap(
          () => this.localesService.getLocales()
            .pipe(
              map((data) => new LoadLocalesSuccessAction(data)),
              catchError((error) => of(new LoadLocalesFailureAction(error))),
            ),
        ),
      ),
  );

  constructor(
    private actions$: Actions,
    private localesService: LocalesService,
  ) {}
}

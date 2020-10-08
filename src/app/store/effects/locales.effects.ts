import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
// app imports
import { AddLocaleAction, AddLocaleFailureAction, AddLocaleSuccessAction, LoadLocalesAction, LoadLocalesFailureAction, LoadLocalesSuccessAction, LocalesActionTypes } from '../actions/locales.actions';
import { LocaleService } from '../../core/services/api-interaction/locale.service';

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

  addLocale$ = createEffect(
    () => this.actions$
      .pipe(
        ofType<AddLocaleAction>(LocalesActionTypes.ADD_LOCALE),
        mergeMap(
          (data: any) => this.localeService.addLocale(data.projectUuid, data.payload)
            .pipe(
              map(() => new AddLocaleSuccessAction(data.payload)),
              catchError((error) => of(new AddLocaleFailureAction(error))),
            ),
        ),
      ),
  );

  constructor(
    private actions$: Actions,
    private localeService: LocaleService,
  ) {
  }
}

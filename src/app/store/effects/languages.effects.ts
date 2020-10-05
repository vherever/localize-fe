import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
// app imports
import { LanguagesActionTypes, LoadLanguagesAction, LoadLanguagesFailureAction, LoadLanguagesSuccessAction } from '../actions/languages.actions';
import { LanguagesService } from '../../core/services/api-interaction/languages.service';

@Injectable()
export class LanguagesEffects {
  loadLanguages$ = createEffect(
    () => this.actions$
      .pipe(
        ofType<LoadLanguagesAction>(LanguagesActionTypes.LOAD_LANGUAGES),
        mergeMap(
          () => this.languagesService.getLanguages()
            .pipe(
              map((data) => new LoadLanguagesSuccessAction(data)),
              catchError((error) => of(new LoadLanguagesFailureAction(error))),
            ),
        ),
      ),
  );

  constructor(
    private actions$: Actions,
    private languagesService: LanguagesService,
  ) {}
}

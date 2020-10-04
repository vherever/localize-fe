import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslationsService } from '../../core/services/api-interaction/translations.service';
import {
  AddTranslationAction, AddTranslationFailureAction, AddTranslationSuccessAction,
  CancelLoadTranslationsAction,
  LoadTranslationsAction,
  LoadTranslationsFailureAction,
  LoadTranslationsSuccessAction, RemoveTranslationAction, RemoveTranslationFailureAction, RemoveTranslationSuccessAction,
  TranslationsActionTypes,
  UpdateTranslationAction, UpdateTranslationFailureAction, UpdateTranslationSuccessAction,
} from '../actions/translations.action';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  AddProjectAction,
  AddProjectFailureAction,
  AddProjectSuccessAction,
  DeleteProjectAction,
  DeleteProjectFailureAction,
  DeleteProjectSuccessAction,
  ProjectsActionTypes,
} from '../actions/projects.actions';

@Injectable()
export class TranslationsEffects {
  loadTranslations$ = createEffect(
    () => (this.actions$ as any)
      .pipe(
        ofType<LoadTranslationsAction | CancelLoadTranslationsAction>(TranslationsActionTypes.LOAD_TRANSLATIONS, TranslationsActionTypes.CANCEL_LOAD_TRANSLATIONS),
        switchMap(
          (action: any) => action.type === TranslationsActionTypes.CANCEL_LOAD_TRANSLATIONS ? of() : this.translationService.getTranslationsById(action.payload)
            .pipe(
              map((data) => new LoadTranslationsSuccessAction(data)),
              catchError((error) => of(new LoadTranslationsFailureAction(error))),
            ),
        ),
      ),
  );

  addTranslation$ = createEffect(
    () => this.actions$
      .pipe(
        ofType<AddTranslationAction>(TranslationsActionTypes.ADD_TRANSLATION),
        mergeMap(
          (data) => this.translationService.createTranslation(data.projectUuid, data.payload)
            .pipe(
              map((translation) => new AddTranslationSuccessAction(translation)),
              catchError((error) => of(new AddTranslationFailureAction(error))),
            ),
        ),
      ),
  );

  updateTranslation$ = createEffect(
    () => this.actions$
      .pipe(
        ofType<UpdateTranslationAction>(TranslationsActionTypes.UPDATE_TRANSLATION),
        mergeMap(
          (data: any) => this.translationService.updateTranslation(data.projectUuid, data.translationUuid, data.payload)
            .pipe(
              map((project) => new UpdateTranslationSuccessAction(project)),
              catchError((error) => of(new UpdateTranslationFailureAction(error))),
            ),
        ),
      ),
  );

  removeTranslation$ = createEffect(
    () => this.actions$
      .pipe(
        ofType<RemoveTranslationAction>(TranslationsActionTypes.REMOVE_TRANSLATION),
        mergeMap(
          (data) => this.translationService.removeTranslation(data.projectUuid, data.translationUuid)
            .pipe(
              map(() => new RemoveTranslationSuccessAction(data.projectUuid, data.translationUuid)),
              catchError((error) => of(new RemoveTranslationFailureAction(error))),
            ),
        ),
      ),
  );

  constructor(
    private actions$: Actions,
    private translationService: TranslationsService,
  ) {
  }
}

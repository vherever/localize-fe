import { Injectable } from '@angular/core';
// app imports
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslationTagsService } from '../../core/services/api-interaction/translation-tags.service';
import {
  AddTagToTranslationAction, AddTagToTranslationFailureAction, AddTagToTranslationSuccessAction,
  LoadTranslationTagsAction,
  LoadTranslationTagsFailureAction,
  LoadTranslationTagsSuccessAction,
  TranslationTagsActionTypes,
} from '../actions/translation-tags.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TranslationTagsEffects {
  $loadTranslationTags = createEffect(
    () => this.actions$
      .pipe(
        ofType<LoadTranslationTagsAction>(TranslationTagsActionTypes.LOAD_TRANSLATION_TAGS),
        mergeMap(
          (action) => this.translationTagsService.getTranslationTags(action.projectUuid, action.translationUuid)
            .pipe(
              map((data) => new LoadTranslationTagsSuccessAction(data)),
              catchError((error) => of(new LoadTranslationTagsFailureAction(error))),
            ),
        ),
      ),
  );

  $addTagsToTranslation = createEffect(
    () => this.actions$
      .pipe(
        ofType<AddTagToTranslationAction>(TranslationTagsActionTypes.ADD_TAGS_TO_TRANSLATION),
        mergeMap(
          (action) => this.translationTagsService.addTagsToTranslation(action.projectUuid, action.translationUuid, action.reqBody)
            .pipe(
              map((data) => new AddTagToTranslationSuccessAction(data)),
              catchError((error) => of(new AddTagToTranslationFailureAction(error))),
            ),
        ),
      ),
  );

  constructor(
    private actions$: Actions,
    private translationTagsService: TranslationTagsService,
  ) {
  }
}

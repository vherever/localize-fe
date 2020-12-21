import { Action } from '@ngrx/store';

export enum TranslationTagsActionTypes {
  LOAD_TRANSLATION_TAGS = '[TRANSLATION_TAGS] Load translation tags',
  LOAD_TRANSLATION_TAGS_SUCCESS = '[TRANSLATION_TAGS] Load translation tags Success',
  LOAD_TRANSLATION_TAGS_FAILURE = '[TRANSLATION_TAGS] Load translation tags Failure',

  ADD_TAGS_TO_TRANSLATION = '[TRANSLATION_TAGS] Add tags to translation',
  ADD_TAGS_TO_TRANSLATION_SUCCESS = '[TRANSLATION_TAGS] Add tags to translation Success',
  ADD_TAGS_TO_TRANSLATION_FAILURE = '[TRANSLATION_TAGS] Add tags to translation Failure',

  CLEAR_TRANSLATION_TAGS_STATE = '[TRANSLATION_TAGS] Clear translation tags state',

  REMOVE_TAGS_FROM_TRANSLATION = '[TRANSLATION_TAGS] Remove tags from translation',
  REMOVE_TAGS_FROM_TRANSLATION_SUCCESS = '[TRANSLATION_TAGS] Remove tags from translation Success',
  REMOVE_TAGS_FROM_TRANSLATION_FAILURE = '[TRANSLATION_TAGS] Remove tags from translation Failure',
}

export class LoadTranslationTagsAction implements Action {
  readonly type = TranslationTagsActionTypes.LOAD_TRANSLATION_TAGS;
  constructor(public projectUuid: string, public translationUuid: string) {
  }
}

export class LoadTranslationTagsSuccessAction implements Action {
  readonly type = TranslationTagsActionTypes.LOAD_TRANSLATION_TAGS_SUCCESS;
  constructor(public payload: any) {
  }
}

export class LoadTranslationTagsFailureAction implements Action {
  readonly type = TranslationTagsActionTypes.LOAD_TRANSLATION_TAGS_FAILURE;
  constructor(public payload: Error) {
  }
}

export class AddTagToTranslationAction implements Action {
  readonly type = TranslationTagsActionTypes.ADD_TAGS_TO_TRANSLATION;
  constructor(public projectUuid: string, public translationUuid: string, public reqBody: { tagsUuids: string }) {
  }
}

export class AddTagToTranslationSuccessAction implements Action {
  readonly type = TranslationTagsActionTypes.ADD_TAGS_TO_TRANSLATION_SUCCESS;
  constructor(public payload: any) {
  }
}

export class AddTagToTranslationFailureAction implements Action {
  readonly type = TranslationTagsActionTypes.ADD_TAGS_TO_TRANSLATION_FAILURE;
  constructor(public payload: Error) {
  }
}

export class ClearTranslationTagsStateAction implements Action {
  readonly type = TranslationTagsActionTypes.CLEAR_TRANSLATION_TAGS_STATE;
}

export type TranslationTagsAction = LoadTranslationTagsAction | LoadTranslationTagsSuccessAction | LoadTranslationTagsFailureAction |
  AddTagToTranslationAction | AddTagToTranslationSuccessAction | AddTagToTranslationFailureAction |
  ClearTranslationTagsStateAction;

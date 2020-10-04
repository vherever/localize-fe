import { Action } from '@ngrx/store';

export enum TranslationsActionTypes {
  LOAD_TRANSLATIONS = '[TRANSLATIONS] Load Translations',
  LOAD_TRANSLATIONS_SUCCESS = '[TRANSLATIONS] Load Translations Success',
  LOAD_TRANSLATIONS_FAILURE = '[TRANSLATIONS] Load Translations Failure',
  CANCEL_LOAD_TRANSLATIONS = '[TRANSLATIONS] Cancel Load Translations Action',
  ADD_TRANSLATION = '[TRANSLATION] Add Translation',
  ADD_TRANSLATION_SUCCESS = '[TRANSLATION] Add Translation Success',
  ADD_TRANSLATION_FAILURE = '[TRANSLATION] Add Translation Failure',
  UPDATE_TRANSLATION = '[TRANSLATION] Update Translation',
  UPDATE_TRANSLATION_SUCCESS = '[TRANSLATION] Update Translation Success',
  UPDATE_TRANSLATION_FAILURE = '[TRANSLATION] Update Translation Failure',
  REMOVE_TRANSLATION = '[TRANSLATION] Remove Translation Action',
  REMOVE_TRANSLATION_SUCCESS = '[TRANSLATION] Remove Translation Success Action',
  REMOVE_TRANSLATION_FAILURE = '[TRANSLATION] Remove Translation Failure Action',
}

export class LoadTranslationsAction implements Action {
  readonly type = TranslationsActionTypes.LOAD_TRANSLATIONS;
  constructor(public payload: string) {
  }
}

export class LoadTranslationsSuccessAction implements Action {
  readonly type = TranslationsActionTypes.LOAD_TRANSLATIONS_SUCCESS;
  constructor(public payload: any) {
  }
}

export class LoadTranslationsFailureAction implements Action {
  readonly type = TranslationsActionTypes.LOAD_TRANSLATIONS_FAILURE;
  constructor(public payload: Error) {
  }
}

export class CancelLoadTranslationsAction implements Action {
  readonly type = TranslationsActionTypes.CANCEL_LOAD_TRANSLATIONS;
}

export class AddTranslationAction implements Action {
  readonly type = TranslationsActionTypes.ADD_TRANSLATION;
  constructor(public projectUuid: string, public payload: any) {
  }
}

export class AddTranslationSuccessAction implements Action {
  readonly type = TranslationsActionTypes.ADD_TRANSLATION_SUCCESS;
  constructor(public payload: any) {
  }
}

export class AddTranslationFailureAction implements Action {
  readonly type = TranslationsActionTypes.ADD_TRANSLATION_FAILURE;
  constructor(public payload: Error) {
  }
}

export class UpdateTranslationAction implements Action {
  readonly type = TranslationsActionTypes.UPDATE_TRANSLATION;
  constructor(public projectUuid: string, public translationUuid: string, public payload: any) {
  }
}

export class UpdateTranslationSuccessAction implements Action {
  readonly type = TranslationsActionTypes.UPDATE_TRANSLATION_SUCCESS;
  constructor(public payload: any) {
  }
}

export class UpdateTranslationFailureAction implements Action {
  readonly type = TranslationsActionTypes.UPDATE_TRANSLATION_FAILURE;
  constructor(public payload: Error) {
  }
}

export class RemoveTranslationAction implements Action {
  readonly type = TranslationsActionTypes.REMOVE_TRANSLATION;
  constructor(public projectUuid: string, public translationUuid: string) {
  }
}

export class RemoveTranslationSuccessAction implements Action {
  readonly type = TranslationsActionTypes.REMOVE_TRANSLATION_SUCCESS;
  constructor(public projectUuid: string, public translationUuid: string) {
  }
}

export class RemoveTranslationFailureAction implements Action {
  readonly type = TranslationsActionTypes.REMOVE_TRANSLATION_FAILURE;
  constructor(public payload: Error) {
  }
}

export type TranslationsAction = LoadTranslationsAction | LoadTranslationsSuccessAction | LoadTranslationsFailureAction |
  AddTranslationAction | AddTranslationSuccessAction | AddTranslationFailureAction |
  UpdateTranslationAction | UpdateTranslationSuccessAction | UpdateTranslationFailureAction |
  RemoveTranslationAction | RemoveTranslationSuccessAction | RemoveTranslationFailureAction |
  CancelLoadTranslationsAction;

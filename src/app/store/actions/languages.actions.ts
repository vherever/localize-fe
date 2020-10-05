import { Action } from '@ngrx/store';

export enum LanguagesActionTypes {
  LOAD_LANGUAGES = '[LANGUAGES] Load languages',
  LOAD_LANGUAGES_SUCCESS = '[LANGUAGES] Load languages Success',
  LOAD_LANGUAGES_FAILURE = '[LANGUAGES] Load languages Failure',
}

export class LoadLanguagesAction implements Action {
  readonly type = LanguagesActionTypes.LOAD_LANGUAGES;
}

export class LoadLanguagesSuccessAction implements Action {
  readonly type = LanguagesActionTypes.LOAD_LANGUAGES_SUCCESS;
  constructor(public payload: any) {
  }
}

export class LoadLanguagesFailureAction implements Action {
  readonly type = LanguagesActionTypes.LOAD_LANGUAGES_FAILURE;
  constructor(public payload: Error) {
  }
}

export type LanguagesAction = LoadLanguagesAction | LoadLanguagesSuccessAction | LoadLanguagesFailureAction;

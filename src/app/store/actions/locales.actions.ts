import { Action } from '@ngrx/store';

export enum LocalesActionTypes {
  // We load locales from project object and do not from the server.
  LOAD_LOCALES = '[LOCALES] Load Locales',
  LOAD_LOCALES_SUCCESS = '[LOCALES] Load Locales Success',
  LOAD_LOCALES_FAILURE = '[LOCALES] Load Locales Failure',
  ADD_LOCALE = '[LOCALE] Add Locale',
  ADD_LOCALE_SUCCESS = '[LOCALE] Add Locale Success',
  ADD_LOCALE_FAILURE = '[LOCALE] Add Locale Failure',
}

export class LoadLocalesAction implements Action {
  readonly type = LocalesActionTypes.LOAD_LOCALES;
  constructor(public payload: any) {
  }
}

export class LoadLocalesSuccessAction implements Action {
  readonly type = LocalesActionTypes.LOAD_LOCALES_SUCCESS;
  constructor(public payload: any) {
  }
}

export class LoadLocalesFailureAction implements Action {
  readonly type = LocalesActionTypes.LOAD_LOCALES_FAILURE;
  constructor(public payload: Error) {
  }
}

export class AddLocaleAction implements Action {
  readonly type = LocalesActionTypes.ADD_LOCALE;
  constructor(public projectUuid: string, public payload: string) {
  }
}

export class AddLocaleSuccessAction implements Action {
  readonly type = LocalesActionTypes.ADD_LOCALE_SUCCESS;
  constructor(public payload: string) {
  }
}

export class AddLocaleFailureAction implements Action {
  readonly type = LocalesActionTypes.ADD_LOCALE_FAILURE;
  constructor(public payload: Error) {
  }
}

export type LocalesAction = LoadLocalesAction | LoadLocalesSuccessAction | LoadLocalesFailureAction |
  AddLocaleAction | AddLocaleSuccessAction | AddLocaleFailureAction;

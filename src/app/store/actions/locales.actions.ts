import { Action } from '@ngrx/store';

export enum LocalesActionTypes {
  LOAD_LOCALES = '[LOCALES] Load locales',
  LOAD_LOCALES_SUCCESS = '[LOCALES] Load locales Success',
  LOAD_LOCALES_FAILURE = '[LOCALES] Load locales Failure',
}

export class LoadLocalesAction implements Action {
  readonly type = LocalesActionTypes.LOAD_LOCALES;
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

export type LocalesAction = LoadLocalesAction | LoadLocalesSuccessAction | LoadLocalesFailureAction;

import { Action } from '@ngrx/store';

export enum LocaleActionTypes {
  LOAD_DEFAULT_LOCALE = '[LOCALE] Load default Locale',
}

export class LoadDefaultLocaleAction implements Action {
  readonly type = LocaleActionTypes.LOAD_DEFAULT_LOCALE;
  constructor(public payload: any) {
  }
}

export type LocaleActions = LoadDefaultLocaleAction;

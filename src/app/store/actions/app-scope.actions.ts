import { Action } from '@ngrx/store';

export enum AppScopeActionTypes {
  GET_SELECTED_TRANSLATION = '[APP_SCOPE] Get selected translation',
  CLEAR_SELECTED_TRANSLATION = '[APP_SCOPE] Clear selected translation',
}

export class SetSelectedTranslationAction implements Action {
  readonly type = AppScopeActionTypes.GET_SELECTED_TRANSLATION;
  constructor(public payload: any) {
  }
}

export class ClearSelectedTranslationAction implements Action {
  readonly type = AppScopeActionTypes.CLEAR_SELECTED_TRANSLATION;
}

export type AppScopeAction = SetSelectedTranslationAction | ClearSelectedTranslationAction;

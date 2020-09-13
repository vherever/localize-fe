import { Action } from '@ngrx/store';

export enum ProjectActionTypes {
  LOAD_PROJECT_BY_ID = '[PROJECT] Load Project by id',
  LOAD_PROJECT_BY_ID_SUCCESS = '[PROJECT] Load Project by id Success',
  LOAD_PROJECT_BY_ID_FAILURE = '[PROJECT] Load Project by id Failure',
  CANCEL_PROJECT_LOADING_ACTION = '[PROJECT] Cancel Project loading Action',
}

export class LoadProjectByIdAction implements Action {
  readonly type = ProjectActionTypes.LOAD_PROJECT_BY_ID;
  constructor(public payload: string) {
  }
}

export class LoadProjectByIdSuccessAction implements Action {
  readonly type = ProjectActionTypes.LOAD_PROJECT_BY_ID_SUCCESS;
  constructor(public payload: any) {
  }
}

export class LoadProjectByIdFailureAction {
  readonly type = ProjectActionTypes.LOAD_PROJECT_BY_ID_FAILURE;
  constructor(public payload: Error) {
  }
}

export class CancelProjectLoadingAction implements Action {
  readonly type = ProjectActionTypes.CANCEL_PROJECT_LOADING_ACTION;
}

export type ProjectAction = LoadProjectByIdAction | LoadProjectByIdSuccessAction | LoadProjectByIdFailureAction |
  CancelProjectLoadingAction;

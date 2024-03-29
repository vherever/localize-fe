import { Action } from '@ngrx/store';

export enum ProjectActionTypes {
  LOAD_PROJECT_BY_ID = '[PROJECT] Load Project by id',
  LOAD_PROJECT_BY_ID_SUCCESS = '[PROJECT] Load Project by id Success',
  LOAD_PROJECT_BY_ID_FAILURE = '[PROJECT] Load Project by id Failure',
  CANCEL_PROJECT_LOADING_ACTION = '[PROJECT] Cancel Project loading Action',
  UPDATING_PROJECT = '[PROJECT] Updating project',
  CLEAR_PROJECT_ACTION = '[PROJECT] Clear Project',
}

export class LoadProjectByIdAction implements Action {
  readonly type = ProjectActionTypes.LOAD_PROJECT_BY_ID;
  constructor(public payload: string, public updating?: boolean) {
  }
}

export class LoadProjectByIdSuccessAction implements Action {
  readonly type = ProjectActionTypes.LOAD_PROJECT_BY_ID_SUCCESS;
  constructor(public payload: any, public updating?: boolean) {
  }
}

export class LoadProjectByIdFailureAction {
  readonly type = ProjectActionTypes.LOAD_PROJECT_BY_ID_FAILURE;
  constructor(public payload: Error, public updating?: boolean) {
  }
}

export class CancelProjectLoadingAction implements Action {
  readonly type = ProjectActionTypes.CANCEL_PROJECT_LOADING_ACTION;
}

export class UpdatingProjectAction implements Action {
  readonly type = ProjectActionTypes.UPDATING_PROJECT;
}

export class ClearProjectAction implements Action {
  readonly type = ProjectActionTypes.CLEAR_PROJECT_ACTION;
}

export type ProjectAction = LoadProjectByIdAction | LoadProjectByIdSuccessAction | LoadProjectByIdFailureAction |
  CancelProjectLoadingAction | UpdatingProjectAction | ClearProjectAction;

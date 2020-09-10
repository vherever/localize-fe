import { Action } from '@ngrx/store';

export enum ProjectActionTypes {
  LOAD_PROJECTS = '[PROJECT] Load Projects',
  LOAD_PROJECTS_SUCCESS = '[PROJECT] Load Projects Success',
  LOAD_PROJECTS_FAILURE = '[PROJECT] Load Projects Failure',
  ADD_PROJECT = '[PROJECT] Add Project',
  ADD_PROJECT_SUCCESS = '[PROJECT] Add Project Success',
  ADD_PROJECT_FAILURE = '[PROJECT] Add Project Failure',
  UPDATE_PROJECT = '[PROJECT] Update Project',
  UPDATE_PROJECT_SUCCESS = '[PROJECT] Update Project Success',
  UPDATE_PROJECT_FAILURE = '[PROJECT] Update Project Failure',
  DELETE_PROJECT = '[PROJECT] Delete Project',
  DELETE_PROJECT_SUCCESS = '[PROJECT] Delete Project Success',
  DELETE_PROJECT_FAILURE = '[PROJECT] Delete Project Failure',
  CANCEL_PROJECT_LOADING_ACTION = '[PROJECT] Cancel Project loading',
}

export class LoadProjectsAction implements Action {
  readonly type = ProjectActionTypes.LOAD_PROJECTS;
}

export class LoadProjectsSuccessAction implements Action {
  readonly type = ProjectActionTypes.LOAD_PROJECTS_SUCCESS;
  constructor(public payload: any) {
  }
}

export class LoadProjectsFailureAction implements Action {
  readonly type = ProjectActionTypes.LOAD_PROJECTS_FAILURE;
  constructor(public payload: Error) {
  }
}

export class CancelProjectLoadingAction implements Action {
  readonly type = ProjectActionTypes.CANCEL_PROJECT_LOADING_ACTION;
}

export class AddProjectAction implements Action {
  readonly type = ProjectActionTypes.ADD_PROJECT;
  constructor(public payload: any) {
  }
}

export class AddProjectSuccessAction implements Action {
  readonly type = ProjectActionTypes.ADD_PROJECT_SUCCESS;
  constructor(public payload: any) {
  }
}

export class AddProjectFailureAction implements Action {
  readonly type = ProjectActionTypes.ADD_PROJECT_FAILURE;
  constructor(public payload: Error) {
  }
}

export class UpdateProjectAction implements Action {
  readonly type = ProjectActionTypes.UPDATE_PROJECT;
  constructor(public payload: any, public uuid: string) {
  }
}

export class UpdateProjectSuccessAction implements Action {
  readonly type = ProjectActionTypes.UPDATE_PROJECT_SUCCESS;
  constructor(public payload: any, uuid: string) {
  }
}

export class UpdateProjectFailureAction implements Action {
  readonly type = ProjectActionTypes.UPDATE_PROJECT_FAILURE;
  constructor(public payload: Error) {
  }
}

export class DeleteProjectAction implements Action {
  readonly type = ProjectActionTypes.DELETE_PROJECT;
  constructor(public payload: string) {
  }
}

export class DeleteProjectSuccessAction implements Action {
  readonly type = ProjectActionTypes.DELETE_PROJECT_SUCCESS;
  constructor(public payload: string) {
  }
}

export class DeleteProjectFailureAction implements Action {
  readonly type = ProjectActionTypes.DELETE_PROJECT_FAILURE;
  constructor(public payload: Error) {
  }
}

export type ProjectsAction =
  LoadProjectsAction | LoadProjectsSuccessAction | LoadProjectsFailureAction |
  AddProjectAction | AddProjectSuccessAction | AddProjectFailureAction |
  DeleteProjectAction | DeleteProjectSuccessAction | DeleteProjectFailureAction |
  UpdateProjectAction | UpdateProjectSuccessAction | UpdateProjectFailureAction |
  CancelProjectLoadingAction;

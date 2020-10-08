import { Action } from '@ngrx/store';

export enum UserActionTypes {
  LOAD_USER = '[USER] Load User',
  LOAD_USER_SUCCESS = '[USER] Load User Success',
  LOAD_USER_FAILURE = '[USER] Load User Failure',
  UPDATE_USER = '[USER] Update User',
  UPDATE_USER_SUCCESS = '[USER] Update User Success',
  UPDATE_USER_FAILURE = '[USER] Update User Failure',
  UPDATE_USER_AVATAR = '[USER] Update User avatar',
  UPDATE_USER_AVATAR_SUCCESS = '[USER] Update User avatar Success',
  UPDATE_USER_AVATAR_FAILURE = '[USER] Update User avatar Failure',
  RESET_USER = '[USER] Reset User state',
  CLEAR_USER = '[USER] Clear User',
}

export class LoadUserAction implements Action {
  readonly type = UserActionTypes.LOAD_USER;
  constructor(public payload: any) {
  }
}

export class LoadUserActionSuccess implements Action {
  readonly type = UserActionTypes.LOAD_USER_SUCCESS;
  constructor(public payload: any) {
  }
}

export class LoadUserActionFailure implements Action {
  readonly type = UserActionTypes.LOAD_USER_FAILURE;
  constructor(public payload: Error) {
  }
}

export class UpdateUserAction implements Action {
  readonly type = UserActionTypes.UPDATE_USER;
  constructor(public payload: any, public uuid: string) {
  }
}

export class UpdateUserActionSuccess implements Action {
  readonly type = UserActionTypes.UPDATE_USER_SUCCESS;
  constructor(public payload: any, public uuid: string) {
  }
}

export class UpdateUserActionFailure implements Action {
  readonly type = UserActionTypes.UPDATE_USER_FAILURE;
  constructor(public payload: Error) {
  }
}

export class UpdateUserAvatarAction implements Action {
  readonly type = UserActionTypes.UPDATE_USER_AVATAR;
  constructor(public payload: any) {
  }
}

export class UpdateUserAvatarSuccessAction implements Action {
  readonly type = UserActionTypes.UPDATE_USER_AVATAR_SUCCESS;
  constructor(public payload: any) {
  }
}

export class UpdateUserAvatarFailureAction implements Action {
  readonly type = UserActionTypes.UPDATE_USER_AVATAR_FAILURE;
  constructor(public payload: Error) {
  }
}

export class ResetUserStateAction implements Action {
  readonly type = UserActionTypes.RESET_USER;
  constructor() {
  }
}

export class ClearUserAction implements Action {
  readonly type = UserActionTypes.CLEAR_USER;
}

export type UserAction = LoadUserAction | LoadUserActionSuccess | LoadUserActionFailure |
  UpdateUserAction | UpdateUserActionSuccess | UpdateUserActionFailure |
  UpdateUserAvatarAction | UpdateUserAvatarSuccessAction | UpdateUserAvatarFailureAction |
  ResetUserStateAction | ClearUserAction;

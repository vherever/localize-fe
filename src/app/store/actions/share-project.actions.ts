import { Action } from '@ngrx/store';

export enum ShareProjectActionTypes {
  MANAGE_USER_PERMISSION = '[SHARE PROJECT] Manage User permission',
  MANAGE_USER_PERMISSION_SUCCESS = '[SHARE PROJECT] Manage User permission Success',
  MANAGE_USER_PERMISSION_FAILURE = '[SHARE PROJECT] Manage User permission Failure',
}

export class ManageUserPermissionAction implements Action {
  readonly type = ShareProjectActionTypes.MANAGE_USER_PERMISSION;
  constructor(
    public targetUuid: string,
    public projectUuid: string,
    public availableTranslationLocales: string,
  ) {
  }
}

export class ManageUserPermissionSuccessAction implements Action {
  readonly type = ShareProjectActionTypes.MANAGE_USER_PERMISSION_SUCCESS;
  constructor(
    public availableTranslationLocales: string,
  ) {
  }
}

export class ManageUserPermissionFailureAction implements Action {
  readonly type = ShareProjectActionTypes.MANAGE_USER_PERMISSION_FAILURE;
  constructor(public payload: Error) {
  }
}

export type ShareProjectAction =
  ManageUserPermissionAction | ManageUserPermissionSuccessAction | ManageUserPermissionFailureAction;

import { Action } from '@ngrx/store';

export enum ShareProjectActionTypes {
  MANAGE_USER_PERMISSION = '[MANAGE USER PERMISSION] Manage User permission',
  MANAGE_USER_PERMISSION_SUCCESS = '[MANAGE USER PERMISSION] Manage User permission Success',
  MANAGE_USER_PERMISSION_FAILURE = '[MANAGE USER PERMISSION] Manage User permission Failure',
  MANAGE_USER_PERMISSION_UPDATED = '[MANAGE USER PERMISSION] Manage User permission Updated',
  UPDATING_PERMISSION = '[UPDATING PERMISSION] Updating Permission',
  MANAGE_USER_PERMISSION_CLEAR_STATE = '[MANAGE USER PERMISSION] Clear State',
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

export class ManageUserPermissionUpdated implements Action {
  readonly type = ShareProjectActionTypes.MANAGE_USER_PERMISSION_UPDATED;
}

export class UpdatingPermission implements Action {
  readonly type = ShareProjectActionTypes.UPDATING_PERMISSION;
}

export class ManageUserPermissionClearState implements Action {
  readonly type = ShareProjectActionTypes.MANAGE_USER_PERMISSION_CLEAR_STATE;
}

export type ShareProjectAction =
  ManageUserPermissionAction | ManageUserPermissionSuccessAction | ManageUserPermissionFailureAction |
  ManageUserPermissionUpdated | UpdatingPermission | ManageUserPermissionClearState;

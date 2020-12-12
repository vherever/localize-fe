import { Action } from '@ngrx/store';

export enum TagActionTypes {
  LOAD_PROJECT_TAGS = '[TAG] Load project tags',
  LOAD_PROJECT_TAGS_SUCCESS = '[TAG] Load project tags Success',
  LOAD_PROJECT_TAGS_FAILURE = '[TAG] Load project tags Failure',

  CREATE_PROJECT_TAG = '[TAG] Create project tag',
  CREATE_PROJECT_TAG_SUCCESS = '[TAG] Create project tag Success',
  CREATE_PROJECT_TAG_FAILURE = '[TAG] Create project tag Failure',

  REMOVE_PROJECT_TAG = '[TAG] Remove project tag',
  REMOVE_PROJECT_TAG_SUCCESS = '[TAG] Remove project tag Success',
  REMOVE_PROJECT_TAG_FAILURE = '[TAG] Remove project tag Failure',

  UPDATE_PROJECT_TAG = '[TAG] Update project tag',
  UPDATE_PROJECT_TAG_SUCCESS = '[TAG] Update project tag Success',
  UPDATE_PROJECT_TAG_FAILURE = '[TAG] Update project tag Failure',

  CLEAR_TAG_STATE = '[TAG] Clear state',
}

export class LoadTagsAction implements Action {
  readonly type = TagActionTypes.LOAD_PROJECT_TAGS;
  constructor(public projectUuid: string) {
  }
}

export class LoadTagsSuccessAction implements Action {
  readonly type = TagActionTypes.LOAD_PROJECT_TAGS_SUCCESS;
  constructor(public payload: any) {
  }
}

export class LoadTagsFailureAction implements Action {
  readonly type = TagActionTypes.LOAD_PROJECT_TAGS_FAILURE;
  constructor(public payload: Error) {
  }
}

export class CreateTagAction implements Action {
  readonly type = TagActionTypes.CREATE_PROJECT_TAG;
  constructor(public projectUuid: string, public data: any) {
  }
}

export class CreateTagSuccessAction implements Action {
  readonly type = TagActionTypes.CREATE_PROJECT_TAG_SUCCESS;
  constructor(public payload: any) {
  }
}

export class CreateTagFailureAction implements Action {
  readonly type = TagActionTypes.CREATE_PROJECT_TAG_FAILURE;
  constructor(public payload: Error) {
  }
}

export class RemoveTagAction implements Action {
  readonly type = TagActionTypes.REMOVE_PROJECT_TAG;
  constructor(public projectUuid: string, public tagUuid: string) {
  }
}

export class RemoveTagSuccessAction implements Action {
  readonly type = TagActionTypes.REMOVE_PROJECT_TAG_SUCCESS;
  constructor(public projectUuid: string, public tagUuid: string) {
  }
}

export class RemoveTagFailureAction implements Action {
  readonly type = TagActionTypes.REMOVE_PROJECT_TAG_FAILURE;
  constructor(public payload: Error) {
  }
}

export class UpdateTagAction implements Action {
  readonly type = TagActionTypes.UPDATE_PROJECT_TAG;
  constructor(public projectUuid: string, public tagUuid: string, public payload: any) {
  }
}

export class UpdateTagSuccessAction implements Action {
  readonly type = TagActionTypes.UPDATE_PROJECT_TAG_SUCCESS;
  constructor(public payload: any) {
  }
}

export class UpdateTagFailureAction implements Action {
  readonly type = TagActionTypes.UPDATE_PROJECT_TAG_FAILURE;
  constructor(public payload: Error) {
  }
}

export class ClearTagStateAction implements Action {
  readonly type = TagActionTypes.CLEAR_TAG_STATE;
}

export type TagAction = LoadTagsAction | LoadTagsSuccessAction | LoadTagsFailureAction |
  CreateTagAction | CreateTagSuccessAction | CreateTagFailureAction |
  UpdateTagAction | UpdateTagSuccessAction | UpdateTagFailureAction |
  RemoveTagAction | RemoveTagSuccessAction | RemoveTagFailureAction |
  ClearTagStateAction;

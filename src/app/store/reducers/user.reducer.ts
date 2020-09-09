import { UserAction, UserActionTypes } from '../actions/user.actions';
import { act } from '@ngrx/effects';

export interface UserState {
  user: any;
  loading: boolean;
  error: Error;
}

const initialState: UserState = {
  user: {},
  loading: false,
  error: undefined,
};

export function UserReducer(state: UserState = initialState, action: UserAction) {
  switch (action.type) {
    // LOAD USER
    case UserActionTypes.LOAD_USER:
      return {
        ...state,
        loading: true,
      };
    case UserActionTypes.LOAD_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case UserActionTypes.LOAD_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    // UPDATE USER
    case UserActionTypes.UPDATE_USER:
      return {
        ...state,
        loading: true,
        updated: false,
      };
    case UserActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        updated: true,
      };
    case UserActionTypes.UPDATE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        updated: false,
      };
    // UPDATE AVATAR
    case UserActionTypes.UPDATE_USER_AVATAR:
      return {
        ...state,
        loading: true,
      };
    case UserActionTypes.UPDATE_USER_AVATAR_SUCCESS:
      return {
        ...state,
        avatar: action.payload.fileName + '?v=' + Math.round((new Date()).getTime() / 1000),
        loading: false,
      };
    case UserActionTypes.UPDATE_USER_AVATAR_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

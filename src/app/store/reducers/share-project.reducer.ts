import { ShareProjectAction, ShareProjectActionTypes } from '../actions/share-project.actions';

export interface ShareProjectState {
  data: string;
  loading: boolean;
  error: Error;
  updating?: boolean;
  updated?: boolean;
  deleted?: boolean;
}

const initialState: ShareProjectState = {
  data: '',
  loading: false,
  error: undefined,
};

export function ShareProjectReducer(state: ShareProjectState = initialState, action: ShareProjectAction) {
  switch (action.type) {
    case ShareProjectActionTypes.MANAGE_USER_PERMISSION:
      return {
        ...state,
        loading: true,
        // updated: false,
      };
    case ShareProjectActionTypes.MANAGE_USER_PERMISSION_SUCCESS:
      return {
        ...state,
        data: action.availableTranslationLocales,
        loading: false,
        updated: true,
      };
    case ShareProjectActionTypes.MANAGE_USER_PERMISSION_FAILURE: {
      return {
        ...state,
        error: action.payload,
        loading: false,
        updated: false,
      };
    }
    case ShareProjectActionTypes.MANAGE_USER_PERMISSION_UPDATED:
      return {
        ...state,
        data: '',
        loading: false,
        updated: true,
      };
    case ShareProjectActionTypes.UPDATING_PERMISSION:
      return {
        ...state,
        loading: false,
        updating: true,
      };
    case ShareProjectActionTypes.MANAGE_USER_PERMISSION_CLEAR_STATE:
      return {
        ...state,
        updating: false,
        updated: false,
        deleted: false,
      };
    case ShareProjectActionTypes.EXCLUDE_USER_FROM_PROJECT:
      return {
        ...state,
        loading: true,
      };
    case ShareProjectActionTypes.EXCLUDE_USER_FROM_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        deleted: true,
      };
    case ShareProjectActionTypes.EXCLUDE_USER_FROM_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        deleted: false,
      };
    default:
      return state;
  }
}

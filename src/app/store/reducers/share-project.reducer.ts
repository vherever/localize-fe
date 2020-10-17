import { ShareProjectAction, ShareProjectActionTypes } from '../actions/share-project.actions';

export interface ShareProjectState {
  data: string;
  loading: boolean;
  error: Error;
  updating?: boolean;
  updated?: boolean;
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
        updated: false,
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
      };
    default:
      return state;
  }
}

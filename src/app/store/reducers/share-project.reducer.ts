import { ShareProjectAction, ShareProjectActionTypes } from '../actions/share-project.actions';

export interface ShareProjectState {
  data: any;
  loading: boolean;
  error: Error;
}

const initialState: ShareProjectState = {
  data: {},
  loading: false,
  error: undefined,
};

export function ShareProjectReducer(state: ShareProjectState = initialState, action: ShareProjectAction) {
  switch (action.type) {
    case ShareProjectActionTypes.MANAGE_USER_PERMISSION:
      return {
        ...state,
        loading: false,
      };
    case ShareProjectActionTypes.MANAGE_USER_PERMISSION_SUCCESS:
      return {
        data: action.availableTranslationLocales,
        ...state,
        loading: true,
      };
    case ShareProjectActionTypes.MANAGE_USER_PERMISSION_FAILURE: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }
    default:
      return state;
  }
}

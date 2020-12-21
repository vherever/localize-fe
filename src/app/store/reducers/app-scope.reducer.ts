import { AppScopeAction, AppScopeActionTypes } from '../actions/app-scope.actions';

interface AppScopeState {
  currentTranslation: any;
}

const initialState: AppScopeState = {
  currentTranslation: null,
};

export function AppScopeReducer(state: AppScopeState = initialState, action: AppScopeAction) {
  switch (action.type) {
    case AppScopeActionTypes.GET_SELECTED_TRANSLATION:
      return {
        ...state,
        currentTranslation: action.payload,
      };
    case AppScopeActionTypes.CLEAR_SELECTED_TRANSLATION:
      return {
        ...state,
        currentTranslation: null,
      };
    default:
      return state;
  }
}

import { LanguagesAction, LanguagesActionTypes } from '../actions/languages.actions';

export interface LanguagesState {
  data: any;
  loading: boolean;
  error: Error;
}

const initialState: LanguagesState = {
  data: null,
  loading: false,
  error: undefined,
};

export function LanguagesReducer(state: LanguagesState = initialState, action: LanguagesAction) {
  switch (action.type) {
    // LOAD LOCALES
    case LanguagesActionTypes.LOAD_LANGUAGES:
      return {
        ...state,
        loading: true,
      };
    case LanguagesActionTypes.LOAD_LANGUAGES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case LanguagesActionTypes.LOAD_LANGUAGES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

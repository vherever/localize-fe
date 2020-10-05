import { LocalesAction, LocalesActionTypes } from '../actions/locales.actions';

export interface LocaleState {
  data: string[];
  loading: boolean;
  error: Error;
}

const initialState: LocaleState = {
  data: [],
  loading: false,
  error: undefined,
};

export function LocalesReducer(state: LocaleState = initialState, action: LocalesAction) {
  switch (action.type) {
    // LOAD_LOCALES
    case LocalesActionTypes.LOAD_LOCALES:
      return {
        ...state,
        loading: true,
      };
    case LocalesActionTypes.LOAD_LOCALES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case LocalesActionTypes.LOAD_LOCALES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    // ADD_LOCALE
    case LocalesActionTypes.ADD_LOCALE:
      return {};
    case LocalesActionTypes.ADD_LOCALE_SUCCESS:
      return {};
    case LocalesActionTypes.ADD_LOCALE_FAILURE:
      return {};
    default:
      return state;
  }
}

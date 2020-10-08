import { LocalesAction, LocalesActionTypes } from '../actions/locales.actions';

export interface LocaleState {
  data: string[];
  loading: boolean;
  error: Error;
  added?: boolean;
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
      return {
        ...state,
        loading: true,
        added: false,
      };
    case LocalesActionTypes.ADD_LOCALE_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload['locale']],
        loading: false,
        added: true,
      };
    case LocalesActionTypes.ADD_LOCALE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        added: false,
      };
    default:
      return state;
  }
}

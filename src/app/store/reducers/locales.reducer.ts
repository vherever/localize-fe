import { LocalesAction, LocalesActionTypes } from '../actions/locales.actions';

export interface LocalesState {
  data: any;
  loading: boolean;
  error: Error;
}

const initialState: LocalesState = {
  data: {},
  loading: false,
  error: undefined,
};

export function LocalesReducer(state: LocalesState = initialState, action: LocalesAction) {
  switch (action.type) {
    // LOAD LOCALES
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
    default:
      return state;
  }
}

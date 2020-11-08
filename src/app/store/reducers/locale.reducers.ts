import { LocaleActions, LocaleActionTypes } from '../actions/locale.actions';

interface LocaleState {
  data: any;
  error: Error;
}

const initialState: LocaleState = {
  data: [],
  error: undefined,
};

export function LocaleReducer(state: LocaleState = initialState, action: LocaleActions) {
  switch (action.type) {
    case LocaleActionTypes.LOAD_DEFAULT_LOCALE: {
      return {
        ...state,
        data: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

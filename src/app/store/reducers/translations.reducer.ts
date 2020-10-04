import { TranslationsAction, TranslationsActionTypes } from '../actions/translations.action';

export interface TranslationsState {
  data: any[];
  loading: boolean;
  updating?: boolean;
  error: Error;
  updated?: boolean;
  added?: boolean;
}

const initialState: TranslationsState = {
  data: [],
  loading: false,
  updating: false,
  error: undefined,
  updated: false,
  added: false,
};

export function TranslationsReducer(state: TranslationsState = initialState, action: TranslationsAction) {
  switch (action.type) {
    // LOAD TRANSLATIONS
    case TranslationsActionTypes.LOAD_TRANSLATIONS:
      return {
        ...state,
        loading: true,
      };
    case TranslationsActionTypes.LOAD_TRANSLATIONS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case TranslationsActionTypes.LOAD_TRANSLATIONS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    // ADD TRANSLATION
    case TranslationsActionTypes.ADD_TRANSLATION:
      return {
        ...state,
        loading: true,
        added: false,
      };
    case TranslationsActionTypes.ADD_TRANSLATION_SUCCESS:
      return {
        ...state,
        data: [action.payload[0], ...state.data],
        loading: false,
        added: true,
      };
    case TranslationsActionTypes.ADD_TRANSLATION_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        added: false,
      };
    // UPDATE TRANSLATION
    case TranslationsActionTypes.UPDATE_TRANSLATION:
      return {
        ...state,
        loading: true,
        updating: true,
        updated: false,
      };
    case TranslationsActionTypes.UPDATE_TRANSLATION_SUCCESS:
      return {
        ...state,
        data: state.data.map((o) => {
          if (o.uuid === action.payload[0].uuid) {
            o = { ...o, ...action.payload[0] };
          }
          return o;
        }),
        loading: false,
        updating: false,
        updated: true,
      };
    case TranslationsActionTypes.UPDATE_TRANSLATION_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        updating: false,
        updated: false,
      };
    // REMOVE TRANSLATION
    case TranslationsActionTypes.REMOVE_TRANSLATION:
      return {
        ...state,
        loading: true,
      };
    case TranslationsActionTypes.REMOVE_TRANSLATION_SUCCESS:
      return {
        ...state,
        data: state.data.filter((item) => item.uuid !== action.translationUuid),
        loading: false,
      };
    case TranslationsActionTypes.REMOVE_TRANSLATION_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

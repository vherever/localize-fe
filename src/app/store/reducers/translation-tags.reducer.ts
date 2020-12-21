import { TranslationTagsAction, TranslationTagsActionTypes } from '../actions/translation-tags.actions';

export interface TranslationTagState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: TranslationTagState = {
  data: null,
  loading: false,
  error: undefined,
};

export function TranslationTagsReducer(state: TranslationTagState = initialState, action: TranslationTagsAction) {
  switch (action.type) {
    // LOAD_TRANSLATION_TAGS
    case TranslationTagsActionTypes.LOAD_TRANSLATION_TAGS:
      return {
        ...state,
        loading: true,
      };
    case TranslationTagsActionTypes.LOAD_TRANSLATION_TAGS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case TranslationTagsActionTypes.LOAD_TRANSLATION_TAGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // ADD_TAGS_TO_TRANSLATION
    case TranslationTagsActionTypes.ADD_TAGS_TO_TRANSLATION:
      return {
        ...state,
        loading: true,
      };
    case TranslationTagsActionTypes.ADD_TAGS_TO_TRANSLATION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case TranslationTagsActionTypes.ADD_TAGS_TO_TRANSLATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TranslationTagsActionTypes.CLEAR_TRANSLATION_TAGS_STATE:
      return {
        ...state,
        data: null,
      };
    default:
      return state;
  }
}

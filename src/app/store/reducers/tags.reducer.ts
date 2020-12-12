import { TagAction, TagActionTypes } from '../actions/tag.actions';

export interface TagState {
  data: any[];
  loading: boolean;
  error: Error;
  updated: boolean;
}

const initialState: TagState = {
  data: [],
  loading: false,
  error: undefined,
  updated: false,
};

export function TagsReducer(state: TagState = initialState, action: TagAction) {
  switch (action.type) {
    // LOAD ALL
    case TagActionTypes.LOAD_PROJECT_TAGS:
      return {
        ...state,
        loading: true,
      };
    case TagActionTypes.LOAD_PROJECT_TAGS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case TagActionTypes.LOAD_PROJECT_TAGS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    // ADD
    case TagActionTypes.CREATE_PROJECT_TAG:
      return {
        ...state,
        loading: true,
        updated: false,
      };
    case TagActionTypes.CREATE_PROJECT_TAG_SUCCESS:
      console.log('action.payload', action, state);
      return {
        ...state,
        data: [action.payload, ...state.data],
        loading: false,
        updated: true,
      };
    case TagActionTypes.CREATE_PROJECT_TAG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        updated: false,
      };
    // UPDATE
    case TagActionTypes.UPDATE_PROJECT_TAG:
      return {
        ...state,
        loading: true,
        updated: false,
      };
    case TagActionTypes.UPDATE_PROJECT_TAG_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map((o) => {
          if (o.uuid === action.payload.uuid) {
            o = { ...o, ...action.payload };
          }
          return o;
        }),
        updated: true,
      };
    case TagActionTypes.UPDATE_PROJECT_TAG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        updated: false,
      };
    // REMOVE
    case TagActionTypes.REMOVE_PROJECT_TAG:
      return {
        ...state,
        loading: true,
        updated: false,
      };
    case TagActionTypes.REMOVE_PROJECT_TAG_SUCCESS:
      return {
        ...state,
        data: state.data.filter((item) => item.uuid !== action.tagUuid),
        loading: false,
        updated: true,
      };
    case TagActionTypes.REMOVE_PROJECT_TAG_FAILURE:
      return {
        ...state,
        error: action.payload,
        updated: false,
        loading: false,
      };
    case TagActionTypes.CLEAR_TAG_STATE:
      return {
        ...state,
        updated: false,
        loading: false,
      };
    default:
      return state;
  }
}

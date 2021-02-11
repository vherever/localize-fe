import { ProjectAction, ProjectActionTypes } from '../actions/project.actions';

export interface ProjectState {
  data: any;
  loading: boolean;
  error: Error;
  updating?: boolean;
}

const initialState: ProjectState = {
  data: null,
  loading: false,
  error: undefined,
};

export function ProjectReducer(state: ProjectState = initialState, action: ProjectAction) {
  switch (action.type) {
    // LOAD PROJECT BY ID
    case ProjectActionTypes.LOAD_PROJECT_BY_ID:
      return {
        ...state,
        loading: true,
        updating: action.updating,
      };
    case ProjectActionTypes.LOAD_PROJECT_BY_ID_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        updating: false,
      };
    case ProjectActionTypes.LOAD_PROJECT_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        updating: false,
      };
    case ProjectActionTypes.CANCEL_PROJECT_LOADING_ACTION:
      return {
        ...state,
        loading: false,
      };
    case ProjectActionTypes.UPDATING_PROJECT:
      return {
        ...state,
        updating: true,
      };
    case ProjectActionTypes.CLEAR_PROJECT_ACTION:
      return {
        ...state,
        data: null,
      };
    case ProjectActionTypes.LOAD_PROJECT_CACHED:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}

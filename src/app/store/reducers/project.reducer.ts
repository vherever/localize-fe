import { ProjectAction, ProjectActionTypes } from '../actions/project.actions';

export interface ProjectState {
  data: any;
  loading: boolean;
  error: Error;
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
      };
    case ProjectActionTypes.LOAD_PROJECT_BY_ID_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case ProjectActionTypes.LOAD_PROJECT_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case ProjectActionTypes.CANCEL_PROJECT_LOADING_ACTION:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

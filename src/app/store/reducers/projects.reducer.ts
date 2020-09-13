import { ProjectsActionTypes, ProjectsAction } from '../actions/projects.actions';

export interface ProjectState {
  list: any[];
  loading: boolean;
  error: Error;
}

const initialState: ProjectState = {
  list: [],
  loading: false,
  error: undefined,
};

export function ProjectsReducer(state: ProjectState = initialState, action: ProjectsAction) {
  switch (action.type) {
    // LOAD PROJECT
    case ProjectsActionTypes.LOAD_PROJECTS:
      return {
        ...state,
        loading: true,
      };
    case ProjectsActionTypes.LOAD_PROJECTS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false,
      };
    case ProjectsActionTypes.LOAD_PROJECTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    // ADD PROJECT
    case ProjectsActionTypes.ADD_PROJECT:
      return {
        ...state,
        loading: true,
      };
    case ProjectsActionTypes.ADD_PROJECT_SUCCESS:
      return {
        ...state,
        list: [action.payload, ...state.list],
        loading: false,
      };
    case ProjectsActionTypes.ADD_PROJECT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    // UPDATE PROJECT
    case ProjectsActionTypes.UPDATE_PROJECT:
      return {
        ...state,
        loading: true,
        updated: false,
      };
    case ProjectsActionTypes.UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        list: state.list.map((o) => {
          if (o.uuid === action.payload.uuid) {
            o = { ...o, ...action.payload };
          }
          return o;
        }),
        loading: false,
        updated: true,
      };
    case ProjectsActionTypes.UPDATE_PROJECT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        updated: false,
      };
    // DELETE PROJECT
    case ProjectsActionTypes.DELETE_PROJECT:
      return {
        ...state,
        loading: true,
      };
    case ProjectsActionTypes.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        list: state.list.filter((item) => item.uuid !== action.payload),
        loading: false,
      };
    case ProjectsActionTypes.DELETE_PROJECT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case ProjectsActionTypes.CANCEL_PROJECTS_LOADING_ACTION:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

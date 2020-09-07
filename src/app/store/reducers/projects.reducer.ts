import { ProjectActionTypes, ProjectsAction } from '../actions/projects.actions';

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
  // console.log('action', action);
  // console.log('state', state);
  switch (action.type) {
    // LOAD PROJECT
    case ProjectActionTypes.LOAD_PROJECTS:
      return {
        ...state,
        loading: true,
      };
    case ProjectActionTypes.LOAD_PROJECTS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false,
      };
    case ProjectActionTypes.LOAD_PROJECTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    // ADD PROJECT
    case ProjectActionTypes.ADD_PROJECT:
      return {
        ...state,
        loading: true,
      };
    case ProjectActionTypes.ADD_PROJECT_SUCCESS:
      return {
        ...state,
        list: [action.payload, ...state.list],
        loading: false,
      };
    case ProjectActionTypes.ADD_PROJECT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    // UPDATE PROJECT
    case ProjectActionTypes.UPDATE_PROJECT:
      return {
        ...state,
        loading: true,
        updated: false,
      };
    case ProjectActionTypes.UPDATE_PROJECT_SUCCESS:
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
    case ProjectActionTypes.UPDATE_PROJECT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        updated: false,
      };
    // DELETE PROJECT
    case ProjectActionTypes.DELETE_PROJECT:
      return {
        ...state,
        loading: true,
      };
    case ProjectActionTypes.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        list: state.list.filter((item) => item.uuid !== action.payload),
        loading: false,
      };
    case ProjectActionTypes.DELETE_PROJECT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ProjectService } from '../../core/services/api-interaction/project.service';
import {
  AddProjectAction,
  AddProjectFailureAction,
  AddProjectSuccessAction,
  CancelProjectsLoadingAction,
  DeleteProjectAction,
  DeleteProjectFailureAction,
  DeleteProjectSuccessAction,
  LoadProjectsAction,
  LoadProjectsFailureAction,
  LoadProjectsSuccessAction,
  ProjectsActionTypes,
  UpdateProjectAction,
  UpdateProjectFailureAction,
  UpdateProjectSuccessAction,
} from '../actions/projects.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProjectsEffects {
  loadProjects$ = createEffect(
    () => (this.actions$ as any)
      .pipe(
        ofType<LoadProjectsAction | CancelProjectsLoadingAction>(ProjectsActionTypes.LOAD_PROJECTS, ProjectsActionTypes.CANCEL_PROJECTS_LOADING_ACTION),
        mergeMap(
          (action: any) => action.type === ProjectsActionTypes.CANCEL_PROJECTS_LOADING_ACTION ? of() : this.projectService.getProjects()
            .pipe(
              map((data) => {
                return new LoadProjectsSuccessAction(data);
              }),
              catchError((error) => of(new LoadProjectsFailureAction(error))),
            ),
        ),
      ),
  );

  addProject$ = createEffect(
    () => this.actions$
      .pipe(
        ofType<AddProjectAction>(ProjectsActionTypes.ADD_PROJECT),
        mergeMap(
          (data) => this.projectService.createProject(data.payload)
            .pipe(
              map((project) => new AddProjectSuccessAction(project)),
              catchError((error) => of(new AddProjectFailureAction(error))),
            ),
        ),
      ),
  );

  updateProject$ = createEffect(
    () => this.actions$
      .pipe(
        ofType<UpdateProjectAction>(ProjectsActionTypes.UPDATE_PROJECT),
        mergeMap(
          (data) => this.projectService.updateProject(data.payload, data.uuid)
            .pipe(
              map((project) => new UpdateProjectSuccessAction(project, data.uuid)),
              catchError((error) => of(new UpdateProjectFailureAction(error))),
            ),
        ),
      ),
  );

  deleteProject$ = createEffect(
    () => this.actions$
      .pipe(
        ofType<DeleteProjectAction>(ProjectsActionTypes.DELETE_PROJECT),
        mergeMap(
          (data) => this.projectService.deleteProject(data.payload)
            .pipe(
              map(() => new DeleteProjectSuccessAction(data.payload)),
              catchError((error) => of(new DeleteProjectFailureAction(error))),
            ),
        ),
      ),
  );

  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
  ) {
  }
}

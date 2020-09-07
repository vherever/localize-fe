import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ProjectService } from '../../core/services/api-interaction/project.service';
import {
  AddProjectAction,
  AddProjectFailureAction,
  AddProjectSuccessAction, DeleteProjectAction, DeleteProjectFailureAction, DeleteProjectSuccessAction,
  LoadProjectsAction,
  LoadProjectsFailureAction,
  LoadProjectsSuccessAction,
  ProjectActionTypes,
} from '../actions/projects.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { error } from 'util';

@Injectable()
export class ProjectsEffects {
  loadProjects$ = createEffect(
    () => this.actions$
      .pipe(
        ofType<LoadProjectsAction>(ProjectActionTypes.LOAD_PROJECTS),
        mergeMap(
          () => this.projectService.getProjects()
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
        ofType<AddProjectAction>(ProjectActionTypes.ADD_PROJECT),
        mergeMap(
          (data) => this.projectService.createProject(data.payload)
            .pipe(
              map((project) => new AddProjectSuccessAction(project)),
              catchError((error) => of(new AddProjectFailureAction(error))),
            ),
        ),
      ),
  );

  deleteProject$ = createEffect(
    () => this.actions$
      .pipe(
        ofType<DeleteProjectAction>(ProjectActionTypes.DELETE_PROJECT),
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

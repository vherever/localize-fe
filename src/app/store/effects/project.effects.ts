import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CancelProjectLoadingAction, LoadProjectByIdAction, LoadProjectByIdFailureAction, LoadProjectByIdSuccessAction, ProjectActionTypes } from '../actions/project.actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProjectService } from '../../core/services/api-interaction/project.service';

@Injectable()
export class ProjectEffects {
  loadProjectById$ = createEffect(
    () => (this.actions$ as any)
      .pipe(
        ofType<LoadProjectByIdAction | CancelProjectLoadingAction>(ProjectActionTypes.LOAD_PROJECT_BY_ID, ProjectActionTypes.CANCEL_PROJECT_LOADING_ACTION),
        switchMap(
          (action: any) => action.type === ProjectActionTypes.CANCEL_PROJECT_LOADING_ACTION ? of() : this.projectService.getProjectById(action.payload)
            .pipe(
              map((data) => new LoadProjectByIdSuccessAction(data)),
              catchError((error) => of(new LoadProjectByIdFailureAction(error))),
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

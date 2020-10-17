import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
// app imports
import { ShareProjectService } from '../../core/services/api-interaction/share-project.service';
import {
  ExcludeUserFromProjectAction,
  ExcludeUserFromProjectFailureAction,
  ExcludeUserFromProjectSuccessAction,
  ManageUserPermissionAction,
  ManageUserPermissionFailureAction,
  ManageUserPermissionSuccessAction,
  ShareProjectActionTypes,
} from '../actions/share-project.actions';

@Injectable()
export class ShareProjectEffects {
  manageUserPermission$ = createEffect(
    () => this.actions$
      .pipe(
        ofType<ManageUserPermissionAction>(ShareProjectActionTypes.MANAGE_USER_PERMISSION),
        mergeMap(
          (data) => this.shareProjectService.managePermissions({
            targetUuid: data.targetUuid,
            projectUuid: data.projectUuid,
            availableTranslationLocales: data.availableTranslationLocales,
          })
            .pipe(
              map(() => new ManageUserPermissionSuccessAction(data.availableTranslationLocales)),
              catchError((error) => of(new ManageUserPermissionFailureAction(error))),
            ),
        ),
      ),
  );

  excludeUserFromProject$ = createEffect(
    () => this.actions$
      .pipe(
        ofType<ExcludeUserFromProjectAction>(ShareProjectActionTypes.EXCLUDE_USER_FROM_PROJECT),
        mergeMap(
          (req) => this.shareProjectService.removeUser({ targetEmail: req.targetEmail, projectUuid: req.projectUuid })
            .pipe(
              map(() => new ExcludeUserFromProjectSuccessAction(req.projectUuid, req.targetEmail)),
              catchError((error) => of(new ExcludeUserFromProjectFailureAction(error))),
            ),
        ),
      ),
  );

  constructor(
    private actions$: Actions,
    private shareProjectService: ShareProjectService,
  ) {
  }
}

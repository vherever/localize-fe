import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
// app imports
import { UserService } from '../../core/services/api-interaction/user.service';
import {
  LoadUserAction,
  LoadUserActionFailure,
  LoadUserActionSuccess,
  UpdateUserAction,
  UpdateUserActionFailure,
  UpdateUserActionSuccess,
  UpdateUserAvatarAction, UpdateUserAvatarFailureAction, UpdateUserAvatarSuccessAction,
  UserActionTypes,
} from '../actions/user.actions';

@Injectable()
export class UserEffects {
  loadUser$ = createEffect(
    () => this.actions$
      .pipe(
        ofType<LoadUserAction>(UserActionTypes.LOAD_USER),
        mergeMap(
          (data) => this.userService.getUserData(data.payload)
            .pipe(
              map((user) => new LoadUserActionSuccess(user)),
              catchError((error) => of(new LoadUserActionFailure(error))),
            ),
        ),
      ),
  );

  updateUser$ = createEffect(
    () => this.actions$
      .pipe(
        ofType<UpdateUserAction>(UserActionTypes.UPDATE_USER),
        mergeMap(
          (data) => this.userService.updateUser(data.uuid, data.payload)
            .pipe(
              map((user) => new UpdateUserActionSuccess(user, data.uuid)),
              catchError((error) => of(new UpdateUserActionFailure(error))),
            ),
        ),
      ),
  );

  updateAvatar$ = createEffect(
    () => this.actions$
      .pipe(
        ofType<UpdateUserAvatarAction>(UserActionTypes.UPDATE_USER_AVATAR),
        mergeMap(
          (data: any) => this.userService.uploadAvatar(data.payload.uuid, data.payload.file)
            .pipe(
              map((data_) => new UpdateUserAvatarSuccessAction(data_)),
              catchError((error) => of(new UpdateUserAvatarFailureAction(error))),
            ),
        ),
      ),
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {}
}

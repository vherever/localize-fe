import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
// app imports
import { TagsService } from '../../core/services/api-interaction/tags.service';
import {
  CreateTagAction,
  CreateTagFailureAction,
  CreateTagSuccessAction,
  LoadTagsAction,
  LoadTagsFailureAction,
  LoadTagsSuccessAction,
  RemoveTagAction, RemoveTagFailureAction,
  RemoveTagSuccessAction,
  TagActionTypes, UpdateTagAction, UpdateTagFailureAction, UpdateTagSuccessAction,
} from '../actions/tag.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TagsEffects {
  loadTags$ = createEffect(
    () => this.actions$
      .pipe(
        ofType<LoadTagsAction>(TagActionTypes.LOAD_PROJECT_TAGS),
        mergeMap(
          (action) => this.tagsService.getTags(action.projectUuid)
            .pipe(
              map((data) => new LoadTagsSuccessAction(data)),
              catchError((error) => of(new LoadTagsFailureAction(error))),
            ),
        ),
      ),
  );

  createTag$ = createEffect(
    () => this.actions$
      .pipe(
        ofType<CreateTagAction>(TagActionTypes.CREATE_PROJECT_TAG),
        mergeMap(
          (action) => this.tagsService.createTag(action.projectUuid, action.data)
            .pipe(
              map((data) => new CreateTagSuccessAction(data)),
              catchError((error) => of(new CreateTagFailureAction(error))),
            ),
        ),
      ),
  );

  updateTag$ = createEffect(
    () => this.actions$
      .pipe(
        ofType<UpdateTagAction>(TagActionTypes.UPDATE_PROJECT_TAG),
        mergeMap(
          (action) => this.tagsService.updateTag(action.projectUuid, action.tagUuid, action.payload)
            .pipe(
              map((data) => new UpdateTagSuccessAction(data)),
              catchError((error) => of(new UpdateTagFailureAction(error))),
            ),
        ),
      ),
  );

  removeTag$ = createEffect(
    () => this.actions$
      .pipe(
        ofType<RemoveTagAction>(TagActionTypes.REMOVE_PROJECT_TAG),
        mergeMap(
          (action) => this.tagsService.removeTag(action.projectUuid, action.tagUuid)
            .pipe(
              map(() => new RemoveTagSuccessAction(action.projectUuid, action.tagUuid)),
              catchError((error) => of(new RemoveTagFailureAction(error))),
            ),
        ),
      ),
  );

  constructor(
    private actions$: Actions,
    private tagsService: TagsService,
  ) {
  }
}

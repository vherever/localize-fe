import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// app imports
import { TranslationTagsApiService } from '../api/translation-tags-api.service';
import { delay } from 'rxjs/operators';

const delay_ms = 2000;

@Injectable()
export class TranslationTagsService {
  constructor(
    private readonly translationTagsApiService: TranslationTagsApiService,
  ) {
  }

  public getTranslationTags(projectUuid: string, translationUuid: string): Observable<any> {
    return this.translationTagsApiService.getTranslationTags(projectUuid, translationUuid)
      .pipe(
        delay(delay_ms),
      );
  }

  public addTagsToTranslation(projectUuid: string, translationUuid: string, reqBody: { tagsUuids: string }): Observable<any> {
    return this.translationTagsApiService.addTagsToTranslation(projectUuid, translationUuid, reqBody)
      .pipe(
        delay(delay_ms),
      );
  }
}

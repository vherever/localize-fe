import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// app imports
import { TranslationApiService } from '../api/translation-api.service';
import { TranslationModel } from '../../models/translation.model';
import { delay } from 'rxjs/operators';

const delay_ms = 2000;

@Injectable()
export class TranslationsService {
  constructor(
    private translationApiService: TranslationApiService,
  ) {
  }

  getTranslationsById(id: string): Observable<TranslationModel[]> {
    return this.translationApiService.getTranslationsById(id)
      .pipe(
        delay(delay_ms),
      );
  }

  updateTranslation(projectId: string, translationId: string, data: any): Observable<TranslationModel[]> {
    return this.translationApiService.updateTranslation(projectId, translationId, data)
      .pipe(
        delay(delay_ms),
      );
  }

  createTranslation(projectId: string, data: any): Observable<TranslationModel[]> {
    return this.translationApiService.createTranslation(projectId, data)
      .pipe(
        delay(delay_ms),
      );
  }

  removeTranslation(projectId: string, translationId: string): Observable<any> {
    return this.translationApiService.removeTranslation(projectId, translationId)
      .pipe(
        delay(delay_ms),
      );
  }
}

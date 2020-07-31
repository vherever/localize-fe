import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// app imports
import { TranslationApiService } from '../api/translation-api.service';
import { TranslationModel } from '../../models/translation.model';

@Injectable()
export class TranslationsService {
  constructor(
    private translationApiService: TranslationApiService,
  ) {
  }

  getTranslationsById(id: string): Observable<TranslationModel[]> {
    return this.translationApiService.getTranslationsById(id);
  }

  updateTranslation(projectId: string, translationId: string, data: any): Observable<TranslationModel[]> {
    return this.translationApiService.updateTranslation(projectId, translationId, data);
  }

  createTranslation(projectId: string, data: any): Observable<TranslationModel[]> {
    return this.translationApiService.createTranslation(projectId, data);
  }

  removeTranslation(projectId: string, translationId: string): Observable<any> {
    return this.translationApiService.removeTranslation(projectId, translationId);
  }
}

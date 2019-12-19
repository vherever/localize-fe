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

  getTranslationsById(id: number): Observable<TranslationModel[]> {
    return this.translationApiService.getTranslationsById(id);
  }

  updateTranslation(projectId: number, translationId: number, data: any): Observable<TranslationModel[]> {
    return this.translationApiService.updateTranslation(projectId, translationId, data);
  }

  createTranslation(projectId: number, data: any): Observable<TranslationModel[]> {
    return this.translationApiService.createTranslation(projectId, data);
  }
}

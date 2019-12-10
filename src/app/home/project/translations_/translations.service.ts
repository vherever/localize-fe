import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// app imports
import { TranslationApiService } from '../../../core/api/services/translation-api.service';
import { TranslationModel } from '../../../core/models/translation.model';

@Injectable()
export class TranslationsService {
  constructor(
    private translationApiService: TranslationApiService,
  ) {
  }

  getTranslationsById(id: number): Observable<TranslationModel[]> {
    return this.translationApiService.getTranslationsById(id);
  }
}

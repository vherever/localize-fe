import { Injectable } from '@angular/core';
import { TranslationApiService } from '../../../core/api/services/translation-api.service';
import { Observable } from 'rxjs';

@Injectable()
export class TranslationsService {
  constructor(
    private translationApiService: TranslationApiService,
  ) {}

  getTranslationsById(id: number): Observable<any> {
    return this.translationApiService.getTranslationsById(id);
  }
}

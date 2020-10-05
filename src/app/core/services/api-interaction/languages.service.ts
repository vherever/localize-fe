import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// app imports
import { LanguagesApiService } from '../api/languages-api.service';
import { LocalesModel } from '../../models/locales.model';

@Injectable()
export class LanguagesService {
  constructor(
    private languagesApiService: LanguagesApiService,
  ) {
  }

  getLanguages(): Observable<LocalesModel> {
    return this.languagesApiService.getLanguages();
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// app imports
import { LanguagesApiService } from '../api/languages-api.service';
import { LanguagesModel } from '../../models/languages.model';

@Injectable()
export class LanguagesService {
  constructor(
    private languagesApiService: LanguagesApiService,
  ) {
  }

  getLanguages(): Observable<LanguagesModel> {
    return this.languagesApiService.getLanguages();
  }
}

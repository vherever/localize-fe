import { Injectable } from '@angular/core';
import { LocalesApiService } from '../api/locales-api.service';
import { Observable } from 'rxjs';
import { LocaleModel } from '../../models/locale.model';

@Injectable()
export class LocalesService {
  constructor(
    private localesApiService: LocalesApiService,
  ) {
  }

  getLocales(): Observable<LocaleModel[]> {
    return this.localesApiService.getLocales();
  }
}

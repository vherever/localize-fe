import { Injectable } from '@angular/core';
// app imports
import { LocalesApiService } from '../api/locales-api.service';
import { Observable } from 'rxjs';
import { LocalesModel } from '../../models/locales.model';

@Injectable()
export class LocalesService {
  constructor(
    private localesApiService: LocalesApiService,
  ) {
  }

  getLocales(): Observable<LocalesModel> {
    return this.localesApiService.getLocales();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// app imports
import { environment } from '../../../../environments/environment';
import { LocaleModel } from '../../models/locale.model';

@Injectable()
export class LocalesApiService {
  constructor(
    private http: HttpClient,
  ) {
  }

  getLocales(): Observable<LocaleModel[]> {
    return this.http.get(`${environment.apiUrl}/locales`) as Observable<LocaleModel[]>;
  }
}

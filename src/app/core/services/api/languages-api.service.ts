import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// app imports
import { environment } from '../../../../environments/environment';
import { LocalesModel } from '../../models/locales.model';

@Injectable()
export class LanguagesApiService {
  constructor(
    private http: HttpClient,
  ) {
  }

  getLanguages(): Observable<LocalesModel> {
    return this.http.get(`${environment.apiUrl}/locales`) as Observable<LocalesModel>;
  }
}

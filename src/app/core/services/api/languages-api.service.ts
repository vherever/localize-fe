import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// app imports
import { environment } from '../../../../environments/environment';
import { LanguagesModel } from '../../models/languages.model';

@Injectable()
export class LanguagesApiService {
  constructor(
    private http: HttpClient,
  ) {
  }

  getLanguages(): Observable<LanguagesModel> {
    return this.http.get(`${environment.apiUrl}/locales`) as Observable<LanguagesModel>;
  }
}

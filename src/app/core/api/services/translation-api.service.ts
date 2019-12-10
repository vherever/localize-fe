import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// app imports
import { environment } from '../../../../environments/environment';

@Injectable()
export class TranslationApiService {
  constructor(
    private http: HttpClient,
  ) {
  }

  getTranslationsById(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/projects/${id}/translations`) as Observable<any>;
  }
}

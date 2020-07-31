import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// app imports
import { environment } from '../../../../environments/environment';
import { TranslationModel } from '../../models/translation.model';

@Injectable()
export class TranslationApiService {
  constructor(
    private http: HttpClient,
  ) {
  }

  getTranslationsById(id: string): Observable<TranslationModel[]> {
    return this.http.get(`${environment.apiUrl}/projects/${id}/translations`) as Observable<any>;
  }

  updateTranslation(projectId: string, translationId: string, data: any): Observable<TranslationModel[]> {
    return this.http.put(`${environment.apiUrl}/projects/${projectId}/translations/${translationId}`, data) as Observable<any>;
  }

  createTranslation(projectId: string, data: any): Observable<TranslationModel[]> {
    return this.http.post(`${environment.apiUrl}/projects/${projectId}/translations/`, data) as Observable<TranslationModel[]>;
  }

  removeTranslation(projectId: string, translationId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/projects/${projectId}/translations/${translationId}`) as Observable<any>;
  }
}

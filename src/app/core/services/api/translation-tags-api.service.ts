import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// app imports
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable()
export class TranslationTagsApiService {
  constructor(
    private http: HttpClient,
  ) {
  }

  public getTranslationTags(projectUuid: string, translationUuid: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/projects/${projectUuid}/translations/${translationUuid}/labels`);
  }

  public addTagsToTranslation(projectUuid: string, translationUuid: string, reqBody: { tagsUuids: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/projects/${projectUuid}/translations/${translationUuid}/labels`, reqBody);
  }
}

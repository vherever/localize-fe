import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// app imports
import { environment } from '../../../../environments/environment';

@Injectable()
export class TagsApiService {
  constructor(
    private http: HttpClient,
  ) {
  }

  getTags(projectUuid: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/projects/${projectUuid}/labels`);
  }

  createTag(projectUuid: string, data: { color: string; name: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/projects/${projectUuid}/labels`, data);
  }

  updateTag(projectUuid: string, tagUuid: string, data: { color: string; name: string }): Observable<any> {
    return this.http.put(`${environment.apiUrl}/projects/${projectUuid}/labels/${tagUuid}`, data);
  }

  removeTag(projectUuid: string, tagUuid: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/projects/${projectUuid}/labels/${tagUuid}`);
  }
}

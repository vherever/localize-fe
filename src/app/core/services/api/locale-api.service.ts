import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// app imports
import { environment } from '../../../../environments/environment';
import { LocaleReqModel } from '../../models/req-body/locale-req.model';
import { ProjectModel } from '../../models/project.model';

@Injectable()
export class LocaleApiService {
  constructor(
    private http: HttpClient,
  ) {
  }

  addLocale(projectUuid: string, data: LocaleReqModel): Observable<ProjectModel> {
    return this.http.post(`${environment.apiUrl}/projects/${projectUuid}/locale`, data) as Observable<ProjectModel>;
  }

  removeLocale(projectUuid: string, locale: string): Observable<ProjectModel> {
    return this.http.delete(`${environment.apiUrl}/projects/${projectUuid}/locale/${locale}`) as Observable<ProjectModel>;
  }
}

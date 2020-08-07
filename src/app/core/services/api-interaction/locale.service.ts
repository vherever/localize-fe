import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// app imports
import { LocaleReqModel } from '../../models/req-body/locale-req.model';
import { ProjectModel } from '../../models/project.model';
import { LocaleApiService } from '../api/locale-api.service';

@Injectable()
export class LocaleService {
  constructor(
    private localeApiService: LocaleApiService,
  ) {
  }

  addLocale(projectUuid: string, data: LocaleReqModel): Observable<ProjectModel> {
    return this.localeApiService.addLocale(projectUuid, data);
  }

  removeLocale(projectUuid: string, locale: string): Observable<ProjectModel> {
    return this.localeApiService.removeLocale(projectUuid, locale);
  }
}

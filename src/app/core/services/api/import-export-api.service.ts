import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ImportExportApiService {
  constructor(
    private http: HttpClient,
  ) {
  }

  public exportAssets(projectUuid: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/projects/${projectUuid}/export`, {observe: 'response'});
  }
}

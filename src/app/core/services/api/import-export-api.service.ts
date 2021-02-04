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

  public exportAssets(projectUuid: string, fileFormat: string, assetType: string, languages: string, responseType: string): Observable<any> {
    // @ts-ignore
    return this.http.get(`${environment.apiUrl}/projects/${projectUuid}/export?f=${fileFormat}&t=${assetType}&l=${languages}`, { responseType, observe: 'response' });
  }
}

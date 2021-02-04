import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// app imports
import { ImportExportApiService } from '../api/import-export-api.service';

@Injectable()
export class ImportExportService {
  constructor(
    private importExportApiService: ImportExportApiService,
  ) {
  }

  public exportAssets(projectUuid: string, fileFormat: string, assetType: string, languages: string, responseType: string): Observable<any> {
    return this.importExportApiService.exportAssets(projectUuid, fileFormat, assetType, languages, responseType);
  }
}

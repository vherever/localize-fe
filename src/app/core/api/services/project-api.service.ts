import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// app imports
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ProjectApiService {
  constructor(
    private http: HttpClient,
  ) {}

  getProjectData(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/projects/${id}`) as Observable<any>;
  }
}

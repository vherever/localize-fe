import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// app imports
import { environment } from '../../../../environments/environment';

@Injectable()
export class ProjectApiService {
  constructor(
    private http: HttpClient,
  ) {
  }

  getProjectById(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/projects/${id}`) as Observable<any>;
  }

  createProject(id: number, data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/projects/${id}`, data) as Observable<any>;
  }
}

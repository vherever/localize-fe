import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// app imports
import { environment } from '../../../../environments/environment';
import { ProjectModel } from '../../models/project.model';

@Injectable()
export class ProjectApiService {
  constructor(
    private http: HttpClient,
  ) {
  }

  getProjects(): any {
    return this.http.get(`${environment.apiUrl}/projects`) as Observable<any>;
  }

  getProjectById(id: string): Observable<ProjectModel> {
    return this.http.get(`${environment.apiUrl}/projects/${id}`) as Observable<ProjectModel>;
  }

  createProject(data: any): Observable<ProjectModel> {
    return this.http.post(`${environment.apiUrl}/projects`, data) as Observable<ProjectModel>;
  }

  updateProject(data: any, projectUuid: string): Observable<ProjectModel> {
    return this.http.put(`${environment.apiUrl}/projects/${projectUuid}`, data) as Observable<ProjectModel>;
  }

  deleteProject(uuid: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/projects/${uuid}`, { observe: 'response' }) as Observable<any>;
  }
}

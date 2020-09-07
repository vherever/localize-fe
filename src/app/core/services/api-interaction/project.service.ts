import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// app imports
import { ProjectApiService } from '../api/project-api.service';
import { ProjectModel } from '../../models/project.model';
import { delay } from 'rxjs/operators';

@Injectable()
export class ProjectService {
  constructor(
    private projectApiService: ProjectApiService,
  ) {
  }

  getProjects(): Observable<any> {
    return this.projectApiService.getProjects();
  }

  getProjectById(id: string): Observable<ProjectModel> {
    return this.projectApiService.getProjectById(id);
  }

  createProject(data: any): Observable<ProjectModel> {
    return this.projectApiService.createProject(data);
  }

  updateProject(data: any, projectUuid: string): Observable<ProjectModel> {
    return this.projectApiService.updateProject(data, projectUuid);
  }

  deleteProject(uuid: string): Observable<any> {
    return this.projectApiService.deleteProject(uuid).pipe(
      delay(2000),
    );
  }
}

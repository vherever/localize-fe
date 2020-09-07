import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// app imports
import { ProjectApiService } from '../api/project-api.service';
import { ProjectModel } from '../../models/project.model';
import { delay } from 'rxjs/operators';

const delay_ms = 2000;

@Injectable()
export class ProjectService {
  constructor(
    private projectApiService: ProjectApiService,
  ) {
  }

  getProjects(): Observable<any> {
    return this.projectApiService.getProjects()
      .pipe(
        delay(delay_ms),
      );
  }

  getProjectById(id: string): Observable<ProjectModel> {
    return this.projectApiService.getProjectById(id)
      .pipe(
        delay(delay_ms),
      );
  }

  createProject(data: any): Observable<ProjectModel> {
    return this.projectApiService.createProject(data)
      .pipe(
        delay(delay_ms),
      );
  }

  updateProject(data: any, projectUuid: string): Observable<ProjectModel> {
    return this.projectApiService.updateProject(data, projectUuid)
      .pipe(
        delay(delay_ms),
      );
  }

  deleteProject(uuid: string): Observable<any> {
    return this.projectApiService.deleteProject(uuid).pipe(
      delay(delay_ms),
    );
  }
}

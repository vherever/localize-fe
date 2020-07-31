import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// app imports
import { ProjectApiService } from '../api/project-api.service';
import { ProjectModel } from '../../models/project.model';

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

  deleteProject(id: number): Observable<any> {
    return this.projectApiService.deleteProject(id);
  }
}

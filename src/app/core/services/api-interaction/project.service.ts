import { Injectable } from '@angular/core';
import { ProjectApiService } from '../api/project-api.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProjectService {
  constructor(
    private projectApiService: ProjectApiService,
  ) {
  }

  getProjectById(id: number): Observable<any> {
    return this.projectApiService.getProjectById(id);
  }

  createProject(id: number, data: any): Observable<any> {
    return this.projectApiService.createProject(id, data);
  }
}

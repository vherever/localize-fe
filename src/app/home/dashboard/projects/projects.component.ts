import { Component, Input } from '@angular/core';
import { ProjectModel } from '../../../core/models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: 'projects.component.html',
  styleUrls: ['projects.component.scss'],
})
export class ProjectsComponent {
  @Input() projects: ProjectModel[];

  constructor() {
  }

  onProjectAddClick(): void {
    console.log('___ onProjectAddClick', ); // todo
  }
}

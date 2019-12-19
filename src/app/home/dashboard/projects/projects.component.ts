import { Component, Input } from '@angular/core';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
// app imports
import { ProjectModel } from '../../../core/models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: 'projects.component.html',
  styleUrls: ['projects.component.scss'],
})
export class ProjectsComponent {
  @Input() projects: ProjectModel[];

  constructor(
    private pubSubService: NgxPubSubService,
  ) {
  }

  onProjectAddClick(): void {
    this.pubSubService.publishEvent('addProjectDialogOpened', true);
  }
}

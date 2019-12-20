import { Component, Input, OnDestroy } from '@angular/core';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
// app imports
import { ProjectModel } from '../../../core/models/project.model';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ProjectAddDialogComponent } from '../../project-add-dialog/project-add-dialog.component';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-projects',
  templateUrl: 'projects.component.html',
  styleUrls: ['projects.component.scss'],
})
export class ProjectsComponent implements OnDestroy {
  @Input() projects: ProjectModel[];

  constructor(
    private pubSubService: NgxPubSubService,
    private dialog: MatDialog,
  ) {
  }

  ngOnDestroy() {
  }

  onProjectAddClick(): void {
    const dialogRef: MatDialogRef<ProjectAddDialogComponent> =
      this.dialog.open(ProjectAddDialogComponent, {
        width: '500px',
        data: {},
      });

    dialogRef.componentInstance.addedProject
      .pipe(untilComponentDestroyed(this))
      .subscribe((res: ProjectModel) => {
        this.projects.push(res);
        dialogRef.close();
      });
  }
}

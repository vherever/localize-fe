import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { HttpResponse } from '@angular/common/http';
// app imports
import { ProjectModel } from '../../core/models/project.model';
import { ProjectAddDialogComponent } from '../project-add-dialog/project-add-dialog.component';
import { ProjectService } from '../../core/services/api-interaction/project.service';

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
    private projectService: ProjectService,
    private router: Router,
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

  onProjectClick(event: MouseEvent, id: number): void {
    if (event.srcElement.className.search('lz_download_img') > -1 || event.target['className'].search('lz_download') > -1) {
      this.onExportClick(id);
    } else if (event.srcElement.className.search('lz_remove_img') > -1 || event.target['className'].search('lz_remove') > -1) {
      this.onProjectDeleteClick(id);
    } else {
      this.router.navigate(['/project', id]);
    }
  }

  onProjectDeleteClick(projectId: number): void {
    // add confirm modal
    this.projectService.deleteProject(projectId)
      .pipe(untilComponentDestroyed(this))
      .subscribe((res: HttpResponse<any>) => {
        if (res.status === 200) {
          this.projects = this.projects.filter((p: ProjectModel) => p.id !== projectId);
        }
      });
  }

  onExportClick(id): void {
    console.log('___ onExportClick', id); // todo
  }
}

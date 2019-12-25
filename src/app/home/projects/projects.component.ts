import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { HttpResponse } from '@angular/common/http';
// app imports
import { ProjectModel } from '../../core/models/project.model';
import { ProjectAddDialogComponent } from '../project-add-dialog/project-add-dialog.component';
import { ProjectService } from '../../core/services/api-interaction/project.service';
import { RemoveDialogConfirmComponent } from '../../core/shared/remove-dialog-confirm/remove-dialog-confirm.component';

@Component({
  selector: 'app-projects',
  templateUrl: 'projects.component.html',
  styleUrls: ['projects.component.scss'],
})
export class ProjectsComponent implements OnDestroy {
  @Input() projects: ProjectModel[];
  @Output() projectsUpdatedEvent: EventEmitter<ProjectModel[]> = new EventEmitter<ProjectModel[]>();

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
    const tagName = event.target['tagName'].toLowerCase();
    if (tagName === 'svg') {
      if (event.target['className'].baseVal.search('lz_download_svg') > -1) {
        this.onExportClick(id);
      } else if (event.target['className'].baseVal.search('lz_remove_svg') > -1) {
        this.onProjectDeleteClick(id);
      } else if (event.target['className'].baseVal.search('lz_settings_svg') > -1) {
        this.onSettingsClick(id);
      }
    } else if (tagName === 'use') {
      if (event.target['parentElement'].className.baseVal.search('lz_download_svg') > -1) {
        this.onExportClick(id);
      } else if (event.target['parentElement'].className.baseVal.search('lz_remove_svg') > -1) {
        this.onProjectDeleteClick(id);
      } else if (event.target['parentElement'].className.baseVal.search('lz_settings_svg') > -1) {
        this.onSettingsClick(id);
      }
    } else if (tagName === 'a') {
      if (event.target['className'].search('lz_download') > -1) {
        this.onExportClick(id);
      } else if (event.target['className'].search('lz_remove') > -1) {
        this.onProjectDeleteClick(id);
      } else if (event.target['className'].search('lz_settings') > -1) {
        this.onSettingsClick(id);
      } else {
        this.router.navigate(['/project', id]);
      }
    } else {
      this.router.navigate(['/project', id]);
    }
  }

  private onProjectDeleteClick(projectId: number): void {
    const dialogRef = this.dialog.open(RemoveDialogConfirmComponent, {
      width: '500px',
      data: `Do you really want to remove the project
      <b>${this.getProjectById(projectId).title}</b>?
      This will delete the entire project permanently
      including all translations across
      <b>${this.getProjectLocalesCount(projectId)}</b> locales.`,
    });

    dialogRef.afterClosed().subscribe((state: boolean) => {
      if (state) {
        this.projectService.deleteProject(projectId)
          .pipe(untilComponentDestroyed(this))
          .subscribe((res: HttpResponse<any>) => {
            if (res.status === 200) {
              // update userData after translation updated
              this.projects = this.projects.filter((p: ProjectModel) => p.id !== projectId);
              this.projectsUpdatedEvent.emit(this.projects);
            }
          });
      }
    });
  }

  private onExportClick(id: number): void {
    console.log('___ onExportClick', id); // todo
  }

  private onSettingsClick(id: number): void {
    console.log('___ onSettingsClick', id); // todo
  }

  private getProjectById(projectId: number): ProjectModel {
    return this.projects.find((p: ProjectModel) => p.id === projectId);
  }

  private getProjectLocalesCount(projectId: number): number {
    return this.getProjectById(projectId).translationsLocales.split(',').length;
  }
}

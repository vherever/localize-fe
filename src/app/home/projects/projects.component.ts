import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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
import { AppDataGlobalStorageService } from '../../core/services/app-data-global-storage.service';
import { UPLOADS_ENDPOINT } from '../../core/app-constants';
import { FilterService } from '../../core/shared/filter/filter.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: 'projects.component.html',
  styleUrls: ['projects.component.scss'],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projectsOwned: ProjectModel[];
  projectsShared: ProjectModel[];
  uploadsEndpoint: string;
  yourProjectsCount: number;
  sharedProjectsCount: number;

  changesDetected: BehaviorSubject<boolean>;

  get changesDetected$(): Observable<boolean> {
    return this.changesDetected.asObservable();
  }

  constructor(
    private pubSubService: NgxPubSubService,
    private dialog: MatDialog,
    private projectService: ProjectService,
    private router: Router,
    private appDataGlobalStorageService: AppDataGlobalStorageService,
    private cdr: ChangeDetectorRef,
    public filterService: FilterService,
  ) {
    this.uploadsEndpoint = UPLOADS_ENDPOINT;
    this.changesDetected = new BehaviorSubject<boolean>(false);
  }

  ngOnInit() {
    this.projectService.getProjects()
      .pipe(untilComponentDestroyed(this))
      .subscribe((projects: {owned: ProjectModel[], shared: ProjectModel[]}) => {
        this.projectsOwned = projects.owned;
        this.projectsShared = projects.shared;
        this.yourProjectsCount = this.projectsOwned.length;
        this.sharedProjectsCount = this.projectsShared.length;
      });
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
        this.changesDetected.next(true);
        this.cdr.detectChanges();

        this.projectsOwned.push(res);

        this.changesDetected.next(false);
        this.cdr.detectChanges();
        this.cdr.markForCheck();

        this.yourProjectsCount = this.projectsOwned.length;
        dialogRef.close();
      });
  }

  onProjectClick(event: MouseEvent, project: ProjectModel): void {
    const id = project.id;
    const tagName = event.target['tagName'].toLowerCase();
    // @ts-ignore
    this.appDataGlobalStorageService.currentProject = project;
    if (tagName === 'svg') {
      if (event.target['className'].baseVal.search('lz_download_svg') > -1) {
        this.exportProjectAction(id);
      } else if (event.target['className'].baseVal.search('lz_remove_svg') > -1) {
        this.deleteProjectAction(project);
      } else if (event.target['className'].baseVal.search('lz_settings_svg') > -1) {
        this.projectSettingsAction(id);
      }
    } else if (tagName === 'use') {
      if (event.target['parentElement'].className.baseVal.search('lz_download_svg') > -1) {
        this.exportProjectAction(id);
      } else if (event.target['parentElement'].className.baseVal.search('lz_remove_svg') > -1) {
        this.deleteProjectAction(project);
      } else if (event.target['parentElement'].className.baseVal.search('lz_settings_svg') > -1) {
        this.projectSettingsAction(id);
      }
    } else if (tagName === 'a') {
      if (event.target['className'].search('lz_download') > -1) {
        this.exportProjectAction(id);
      } else if (event.target['className'].search('lz_remove') > -1) {
        this.deleteProjectAction(project);
      } else if (event.target['className'].search('lz_settings') > -1) {
        this.projectSettingsAction(id);
      } else if (event.target['className'].search('lz_list_u_avatar') > -1) {
        // console.log('___ avatar'); // todo
      } else {
        this.router.navigate(['/project', id]);
      }
    } else {
      this.router.navigate(['/project', id]);
    }
  }

  onNotifyFilter(value: string): void {
    this.filterService.onNotifyFilter(value);
  }

  private deleteProjectAction(project: ProjectModel): void {
    const id = project.id;
    const role = project.role;
    const dialogRef = this.dialog.open(RemoveDialogConfirmComponent, {
      width: '500px',
      data: `Do you really want to remove the project
      <b>${this.getProjectById(id).title}</b>?
      This will delete the entire project permanently
      including all translations across
      <b>${this.getProjectLocalesCount(id)}</b> locales.`,
    });

    dialogRef.afterClosed()
      .pipe(untilComponentDestroyed(this))
      .subscribe((state: boolean) => {
      if (state) {
        this.projectService.deleteProject(id)
          .pipe(untilComponentDestroyed(this))
          .subscribe((res: HttpResponse<any>) => {
            if (res.status === 200) {
              // update userData after translation updated
              if (role !== 'administrator') {
                this.projectsShared = this.projectsShared.filter((p: ProjectModel) => p.id !== id);
                this.sharedProjectsCount = this.projectsShared.length;
              }
              this.projectsOwned = this.projectsOwned.filter((p: ProjectModel) => p.id !== id);
              this.yourProjectsCount = this.projectsOwned.length;
            }
          });
      }
    });
  }

  private exportProjectAction(id: number): void {
    console.log('___ onExportClick', id); // todo
  }

  private projectSettingsAction(id: number): void {
    console.log('___ onSettingsClick', id); // todo
  }

  private getProjectById(projectId: number): ProjectModel {
    return this.projectsOwned.find((p: ProjectModel) => p.id === projectId);
  }

  private getProjectLocalesCount(projectId: number): number {
    return this.getProjectById(projectId).translationsLocales.split(',').length;
  }

  private getProjectsCount(): number {
    return this.projectsOwned.length + this.projectsShared.length;
  }
}

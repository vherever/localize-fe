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
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { SortingHelper } from '../../core/helpers/sorting-helper';

@Component({
  selector: 'app-projects',
  templateUrl: 'projects.component.html',
  styleUrls: ['projects.component.scss'],
})
export class ProjectsComponent extends SortingHelper implements OnInit, OnDestroy {
  private currentProjectsListSwitcherState: string;

  yourProjects: ProjectModel[];
  sharedProjects: ProjectModel[];
  allProjects: ProjectModel[];
  allProjectsFiltered: ProjectModel[];
  uploadsEndpoint: string;

  changesDetected: BehaviorSubject<boolean>;
  projects: BehaviorSubject<ProjectModel[]> = new BehaviorSubject(null);

  activeSortKey: BehaviorSubject<string> = new BehaviorSubject<string>('');

  get changesDetected$(): Observable<boolean> {
    return this.changesDetected.asObservable();
  }

  get projects$(): Observable<ProjectModel[]> {
    return this.projects.asObservable();
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
    super();
    this.uploadsEndpoint = UPLOADS_ENDPOINT;
    this.changesDetected = new BehaviorSubject<boolean>(false);
  }

  ngOnInit() {
    this.projectService.getProjects()
      .pipe(untilComponentDestroyed(this))
      .subscribe((projects: ProjectModel[]) => {
        this.projects.next(projects);

        this.projects$
          .pipe(untilComponentDestroyed(this))
          .subscribe((res: ProjectModel[]) => {
            this.allProjects = res;
            this.allProjectsFiltered = [...res];

            this.yourProjects = this.allProjects.filter((p) => p.role === 'administrator');
            this.sharedProjects = this.allProjects.filter((p) => p.role !== 'administrator');
          });
      });

    this.activeSortKey.asObservable()
      .pipe(untilComponentDestroyed(this))
      .subscribe((value: string) => {
        if (value) {
          this.allProjects = this.sortData(this.allProjects, value);
          // this.allProjectsFiltered = this.sortData(this.allProjectsFiltered, value);

          this.yourProjects = this.allProjects.filter((p) => p.role === 'administrator');
          this.sharedProjects = this.allProjects.filter((p) => p.role !== 'administrator');
        }
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

        this.projects$
          .pipe(
            take(1),
            untilComponentDestroyed(this),
          )
          .subscribe((res2: ProjectModel[]) => {
            res2.push(res);
            this.projects.next(res2);
            this.allProjectsFiltered = this.yourProjects;
          });

        this.changesDetected.next(false);
        this.cdr.detectChanges();
        this.cdr.markForCheck();

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

  onSortKeySelected2(value: string): void {
    this.activeSortKey.next(value);
    this.onProjectsListToggleEvent(this.currentProjectsListSwitcherState);
    this.allProjectsFiltered = this.sortData([...this.allProjectsFiltered], value);
  }

  onProjectsListToggleEvent(value: string): void {
    this.currentProjectsListSwitcherState = value;
    switch (value) {
      case 'all':
        this.allProjectsFiltered = this.allProjects;
        break;
      case 'yours':
        this.allProjectsFiltered = this.yourProjects;
        break;
      case 'shared':
        this.allProjectsFiltered = this.sharedProjects;
        break;
    }
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
                this.projects$
                  .pipe(
                    take(1),
                    untilComponentDestroyed(this),
                  )
                  .subscribe((res2: ProjectModel[]) => {
                    const filtered = res2.filter((p) => p.id !== id);
                    this.projects.next(filtered);
                    this.allProjectsFiltered = this.yourProjects;
                  });
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
    return this.yourProjects.find((p: ProjectModel) => p.id === projectId);
  }

  private getProjectLocalesCount(projectId: number): number {
    // +1 means +defaultLocale
    return this.getProjectById(projectId).translationsLocales.split(',').length + 1;
  }
}

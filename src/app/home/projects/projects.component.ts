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
import { ProjectSettingsDialogComponent } from './project-settings-dialog/project-settings-dialog.component';

@Component({
  selector: 'app-projects',
  templateUrl: 'projects.component.html',
  styleUrls: ['projects.component.scss'],
})
export class ProjectsComponent extends SortingHelper implements OnInit, OnDestroy {
  private currentProjectsListSwitcherState: string;
  private currentSortKey: string;
  private currentProject: any;

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
            this.allProjectsFiltered = this.getProjectsFiltered(this.currentProjectsListSwitcherState, this.currentSortKey);
          });
      });

    this.activeSortKey.asObservable()
      .pipe(untilComponentDestroyed(this))
      .subscribe((value: string) => {
        if (value) {
          this.currentSortKey = value;
          this.allProjectsFiltered = this.getProjectsFiltered(this.currentProjectsListSwitcherState, this.currentSortKey);
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
            this.allProjectsFiltered = this.getProjectsFiltered(this.currentProjectsListSwitcherState, this.currentSortKey);
          });

        this.changesDetected.next(false);
        this.cdr.detectChanges();
        this.cdr.markForCheck();

        dialogRef.close();
      });
  }

  onProjectClick(event: MouseEvent, project: ProjectModel): void {
    const id = project.uuid;
    const tagName = event.target['tagName'].toLowerCase();
    // @ts-ignore
    this.appDataGlobalStorageService.currentProject = project;
    if (tagName === 'svg') {
      if (event.target['className'].baseVal.search('lz_download_svg') > -1) {
        this.exportProjectAction(id);
      } else if (event.target['className'].baseVal.search('lz_remove_svg') > -1) {
        this.deleteProjectAction(project);
      } else if (event.target['className'].baseVal.search('lz_settings_svg') > -1) {
        this.projectSettingsAction(project);
      }
    } else if (tagName === 'use') {
      if (event.target['parentElement'].className.baseVal.search('lz_download_svg') > -1) {
        this.exportProjectAction(id);
      } else if (event.target['parentElement'].className.baseVal.search('lz_remove_svg') > -1) {
        this.deleteProjectAction(project);
      } else if (event.target['parentElement'].className.baseVal.search('lz_settings_svg') > -1) {
        this.projectSettingsAction(project);
      }
    } else if (tagName === 'a') {
      if (event.target['className'].search('lz_download') > -1) {
        this.exportProjectAction(id);
      } else if (event.target['className'].search('lz_remove') > -1) {
        this.deleteProjectAction(project);
      } else if (event.target['className'].search('lz_settings') > -1) {
        this.projectSettingsAction(project);
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
    this.changesDetected.next(true);
    this.cdr.detectChanges();

    this.currentSortKey = value;
    this.activeSortKey.next(value);
    this.allProjectsFiltered = this.getProjectsFiltered(this.currentProjectsListSwitcherState, this.currentSortKey);

    this.changesDetected.next(false);
    this.cdr.detectChanges();
    this.cdr.markForCheck();
  }

  onProjectsListToggleEvent(value: string): void {
    this.currentProjectsListSwitcherState = value;
    this.allProjectsFiltered = this.getProjectsFiltered(this.currentProjectsListSwitcherState, this.currentSortKey);
  }

  private getProjectsFiltered(listSwitchKey: string, sortKey: string): any {
    this.currentProjectsListSwitcherState = listSwitchKey;

    this.yourProjects = this.allProjects.filter((p) => p.role === 'administrator');
    this.sharedProjects = this.allProjects.filter((p) => p.role !== 'administrator');

    switch (listSwitchKey) {
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

    return this.sortData(this.allProjectsFiltered, this.currentSortKey);
  }

  private deleteProjectAction(project: ProjectModel): void {
    const uuid = project.uuid;
    const dialogRef = this.dialog.open(RemoveDialogConfirmComponent, {
      width: '500px',
      data: `Do you really want to remove the project
      <b>${this.getProjectById(uuid).title}</b>?
      This will delete the entire project permanently
      including all translations across
      <b>${this.getProjectLocalesCount(uuid)}</b> locales.`,
    });

    dialogRef.afterClosed()
      .pipe(untilComponentDestroyed(this))
      .subscribe((state: boolean) => {
        if (state) {
          this.projectService.deleteProject(uuid)
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
                    const filtered = res2.filter((p) => p.uuid !== uuid);
                    this.projects.next(filtered);
                    this.allProjectsFiltered = this.getProjectsFiltered(this.currentProjectsListSwitcherState, this.currentSortKey);
                  });
              }
            });
        }
      });
  }

  private exportProjectAction(id: string): void {
    console.log('___ onExportClick', id); // todo
  }

  private projectSettingsAction(project: ProjectModel): void {
    const projectInList = this.allProjectsFiltered.find((p) => p.uuid === project.uuid);
    const indexInList = this.allProjectsFiltered.indexOf(projectInList);
    const dialogRef: MatDialogRef<ProjectSettingsDialogComponent> =
      this.dialog.open(ProjectSettingsDialogComponent, {
        width: '500px',
        data: {
          uuid: project.uuid,
          title: project.title,
          description: project.description,
          defaultLocale: project.defaultLocale,
          translationsLocales: project.translationsLocales,
        },
      });

    dialogRef.componentInstance.onResponseReceived
      .pipe(untilComponentDestroyed(this))
      .subscribe((res) => {
        this.allProjectsFiltered[indexInList] = res;
        this.allProjectsFiltered = this.getProjectsFiltered(this.currentProjectsListSwitcherState, this.currentSortKey);
        this.changesDetected.next(true);
        this.cdr.detectChanges();
        this.changesDetected.next(false);
        dialogRef.close();
      });
  }

  private getProjectById(uuid: string): ProjectModel {
    return this.yourProjects.find((p: ProjectModel) => p.uuid === uuid);
  }

  private getProjectLocalesCount(uuid: string): number {
    // +1 means +defaultLocale
    return this.getProjectById(uuid).translationsLocales.split(',').length + 1;
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
// app imports
import { ProjectModel } from '../../core/models/project.model';
import { ProjectAddDialogComponent } from '../project-add-dialog/project-add-dialog.component';
import { ProjectService } from '../../core/services/api-interaction/project.service';
import { RemoveDialogConfirmComponent } from '../../core/shared/remove-dialog-confirm/remove-dialog-confirm.component';
import { AppDataGlobalStorageService } from '../../core/services/app-data-global-storage.service';
import { FilterService } from '../../core/shared/filter/filter.service';
import { SortingHelper } from '../../core/helpers/sorting-helper';
import { ProjectSettingsDialogComponent } from './project-settings-dialog/project-settings-dialog.component';
import { AppStateModel } from '../../store/models/app-state.model';
import { DeleteProjectAction, LoadProjectsAction } from '../../store/actions/projects.actions';

@Component({
  selector: 'app-projects',
  templateUrl: 'projects.component.html',
  styleUrls: ['projects.component.scss'],
})
export class ProjectsComponent extends SortingHelper implements OnInit, OnDestroy {
  private currentProjectsListSwitcherState: string;
  private currentSortKey: string;

  private projectsOriginal$: Observable<ProjectModel[]>;
  private projects$: Observable<ProjectModel[]>;

  private projectItemsCountAll$: Observable<number>;
  private projectItemsCountOnlyMy$: Observable<number>;
  private projectItemsCountSharedWithMe$: Observable<number>;

  private loading$: Observable<boolean>;
  private error$: Observable<Error>;
  private dialogRef: MatDialogRef<ProjectAddDialogComponent>;

  activeSortKey: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private pubSubService: NgxPubSubService,
    private dialog: MatDialog,
    private projectService: ProjectService,
    private router: Router,
    private appDataGlobalStorageService: AppDataGlobalStorageService,
    public filterService: FilterService,
    private store: Store<AppStateModel>,
  ) {
    super();
  }

  ngOnInit() {
    this.projectsOriginal$ = this.store.select((store: AppStateModel) => store.projects.list);
    this.projects$ = this.store.select((store: AppStateModel) => store.projects.list);
    this.loading$ = this.store.select((store: AppStateModel) => store.projects.loading);
    this.error$ = this.store.select((store: AppStateModel) => store.projects.error);

    this.projectItemsCountAll$ = this.projects$
      .pipe(
        map((projects: ProjectModel[]) => projects.length),
      );

    this.projectItemsCountOnlyMy$ = this.projects$
      .pipe(
        map((projects: ProjectModel[]) => {
          return projects.slice().filter((project: ProjectModel) => project.role === 'administrator').length;
        }),
      );

    this.projectItemsCountSharedWithMe$ = this.projects$
      .pipe(
        map((projects: ProjectModel[]) => {
          return projects.slice().filter((project: ProjectModel) => project.role !== 'administrator').length;
        }),
      );

    this.store.dispatch(new LoadProjectsAction());

    this.activeSortKey.asObservable()
      .pipe(untilComponentDestroyed(this))
      .subscribe((value: string) => {
        if (value) {
          this.currentSortKey = value;
          this.projects$ = this.sortData(this.projects$, this.currentSortKey);
        }
      });
  }

  ngOnDestroy() {
  }

  onProjectAddClick(): void {
    this.dialogRef =
      this.dialog.open(ProjectAddDialogComponent, {
        width: '500px',
        data: {},
      });

    this.dialogRef.componentInstance.addedProject
      .pipe(untilComponentDestroyed(this))
      .subscribe(() => {
        this.dialogRef.close();
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
    this.currentSortKey = value;
    this.activeSortKey.next(value);
  }

  onProjectsListToggleEvent(value: string): void {
    this.currentProjectsListSwitcherState = value;
    if (this.currentSortKey) {
      this.projects$ = this.sortData(this.getProjectsFiltered(this.currentProjectsListSwitcherState), this.currentSortKey);
    } else {
      this.projects$ = this.getProjectsFiltered(this.currentProjectsListSwitcherState);
    }
  }

  private getProjectsFiltered(listSwitchKey: string): any {
    this.currentProjectsListSwitcherState = listSwitchKey;

    if (this.currentSortKey) {
      this.activeSortKey.next(this.currentSortKey);
    }

    switch (listSwitchKey) {
      case 'all':
        return this.projectsOriginal$
          .pipe(
            map((projects: ProjectModel[]) => {
              this.closeDialog();
              return projects.slice().filter((project) => project);
            }),
          );
      case 'yours':
        return this.projectsOriginal$
          .pipe(
            map((projects: ProjectModel[]) => {
              this.closeDialog();
              return projects.slice().filter((project: ProjectModel) => project.role === 'administrator');
            }),
          );
      case 'shared':
        return this.projectsOriginal$
          .pipe(
            map((projects: ProjectModel[]) => {
              this.closeDialog();
              return projects.slice().filter((project: ProjectModel) => project.role !== 'administrator');
            }),
          );
      default:
        return this.projectsOriginal$
          .pipe(
            map((projects: ProjectModel[]) => {
              this.closeDialog();
              return projects.slice().filter((project: ProjectModel) => project);
            }),
          );
    }
  }

  private closeDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  private deleteProjectAction(project: ProjectModel): void {
    const uuid = project.uuid;
    const dialogRef = this.dialog.open(RemoveDialogConfirmComponent, {
      width: '500px',
      data: `Do you really want to remove the project
      <b>${project.title}</b>?
      This will delete the entire project permanently
      including all translations across
      <b>${this.getProjectLocalesCount(project)}</b> locales.`,
    });

    dialogRef.afterClosed()
      .pipe(untilComponentDestroyed(this))
      .subscribe((state: boolean) => {
        if (state) {
          this.store.dispatch(new DeleteProjectAction(uuid));
        }
      });
  }

  private exportProjectAction(id: string): void {
    console.log('___ onExportClick', id); // todo
  }

  private projectSettingsAction(project: ProjectModel): void {
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
      .subscribe(() => {
        dialogRef.close();
      });
  }

  private getProjectLocalesCount(project: ProjectModel): number {
    // TODO: Inform about shared project
    // +1 means +defaultLocale, project always have at least one locale by default
    return project.translationsLocales ? project.translationsLocales
      .split(',').length + 1 : 1;
  }
}

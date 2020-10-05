import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { MatDialogRef } from '@angular/material/dialog';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { ProjectModel } from '../../../../core/models/project.model';
import { UPLOADS_ENDPOINT } from '../../../../core/app-constants';
import { LocalesModel } from '../../../../core/models/locales.model';
import { UserModel } from '../../../../core/models/user.model';
import { ManageUserDialogComponent } from './manage-user-dialog/manage-user-dialog.component';
import { InviteUserDialogComponent } from './invite-user-dialog/invite-user-dialog.component';
import { AddLocaleDialogComponent } from './add-locale-dialog/add-locale-dialog.component';
import { AppStateModel } from '../../../../store/models/app-state.model';

@Component({
  selector: 'app-project-sidebar',
  templateUrl: 'project-sidebar.component.html',
  styleUrls: ['project-sidebar.component.scss'],
})
export class ProjectSidebarComponent implements OnInit, OnDestroy {
  @Output() activeLocaleEmit: EventEmitter<string> = new EventEmitter();

  private readonly uploadsEndpoint: string = UPLOADS_ENDPOINT;
  private projectData: ProjectModel;
  private projectLocales: string[];
  private defaultLocale: string;
  private activeLocale: string;
  private languagesData: LocalesModel;
  private userData: UserModel;

  private projectData$: Observable<ProjectModel>;
  private userData$: Observable<UserModel>;
  private projectLoading$: Observable<boolean>;
  private languagesData$: Observable<LocalesModel>;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppStateModel>,
  ) {
  }

  ngOnInit() {
    this.projectLoading$ = this.store.select((store: AppStateModel) => store.project.loading);
    this.projectData$ = this.store.select((store: AppStateModel) => store.project.data);

    setTimeout(() => {
      this.projectData$
        .pipe(untilComponentDestroyed(this))
        .subscribe((projectData: ProjectModel) => {
          if (projectData) {
            this.projectData = projectData;
            this.projectLocales = this.getProjectLocales(this.projectData);
            this.defaultLocale = this.getDefaultLocale(this.projectData);
            this.activeLocale = this.defaultLocale;
            this.activeLocaleEmit.emit(this.activeLocale);
          }
        });
    }, 1);

    this.userData$ = this.store.select((store: AppStateModel) => store.userData.user);
    this.userData$
      .pipe(untilComponentDestroyed(this))
      .subscribe((userData: UserModel) => {
        this.userData = userData;
      });

    this.languagesData$ = this.store.select((store: AppStateModel) => store.languagesData.data);
    this.languagesData$
      .pipe(untilComponentDestroyed(this))
      .subscribe((languagesData: LocalesModel) => {
        this.languagesData = languagesData;
      });
  }

  ngOnDestroy() {
  }

  get flag(): string {
    // TODO: get flag
    return '';
  }

  onLocaleClick(locale: string): void {
    this.activeLocale = locale;
    this.activeLocaleEmit.emit(locale);
  }

  onManageUSerClick(user: UserModel): void {
    const dialogRef = this.dialog.open(ManageUserDialogComponent, {
      width: '600px',
      data: {
        userId: user.id,
        projectId: this.projectData.id,
        userEmail: user.email,
        defaultLocale: this.projectData.defaultLocale,
        projectLocales: this.getAvailableTranslationLocalesForUser(user.id),
      },
    });

    dialogRef.componentInstance.removeUserEmit
      .pipe(untilComponentDestroyed(this))
      .subscribe((res) => {
        this.projectData.sharedUsers = this.projectData.sharedUsers.filter((u: UserModel) => u.id !== res.userId);
      });

    dialogRef.componentInstance.onAvailableTranslationsUpdate
      .pipe(untilComponentDestroyed(this))
      .subscribe((res) => {
        this.projectData.sharedWith.find((u) => u.targetId === user.id).availableTranslationLocales = res;
      });
  }

  getUserTranslations(userId: number): any[] {
    const translationLocales = this.projectData.sharedWith.find((o) => o.targetId === userId).availableTranslationLocales;
    return translationLocales.split(',').map((l) => l.trim());
  }

  onInviteUserClick(): void {
    this.dialog.open(InviteUserDialogComponent, {
      width: '400px',
      data: {
        projectId: this.projectData.id,
      },
    });
  }

  private getAvailableTranslationLocalesForUser(userId: number): any[] {
    const projectLocalesCopy = [...this.projectLocales];
    projectLocalesCopy.unshift(this.projectData.defaultLocale);
    const projectLocales = projectLocalesCopy.map((l) => {
      return {
        checked: false,
        value: l.trim(),
      };
    });

    const userLocales = this.getUserTranslations(userId);
    projectLocales.forEach((l) => {
      userLocales.forEach((ll) => {
        if (l.value === ll) {
          l.checked = true;
        }
      });
    });

    return projectLocales;
  }

  private addLocale(): void {
    const dialogRef: MatDialogRef<AddLocaleDialogComponent> =
      this.dialog.open(AddLocaleDialogComponent, {
        width: '500px',
        autoFocus: false,
        data: {
          projectUuid: this.projectData.uuid,
          projectTitle: this.projectData.title,
        },
      });

    dialogRef.componentInstance.addedLocale
      .subscribe((locale: string) => {
        this.projectLocales.push(locale);
        dialogRef.close();
      });
  }

  private getProjectLocales(projectData: ProjectModel): string[] {
    const projectLocalesByRole = projectData.isShared ?
      projectData.translationsLocales : projectData.translationsLocales;
    const projectLocales: string = projectLocalesByRole ? projectLocalesByRole : '';
    const projectLocalesArray = projectLocales
      .split(',')
      .filter((value, index, self) => {
        return self.indexOf(value) === index && value !== '';
      });
    projectLocalesArray.unshift(projectData.defaultLocale);
    return projectLocalesArray;
  }

  private getDefaultLocale(projectData: ProjectModel): string {
    if (!projectData.isShared) {
      return projectData.defaultLocale;
    } else {
      const localesArray = this.projectData.availableTranslationLocales.split(',');
      const found = localesArray.find((locale: string) => locale === projectData.defaultLocale);
      if (found) {
        return projectData.defaultLocale;
      }
      // return localesArray[0];
      return projectData.defaultLocale;
    }
  }
}

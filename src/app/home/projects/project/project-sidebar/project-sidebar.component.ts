import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { MatDialogRef } from '@angular/material/dialog';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { ProjectModel } from '../../../../core/models/project.model';
import { UPLOADS_ENDPOINT } from '../../../../core/app-constants';
import { LanguagesModel } from '../../../../core/models/languages.model';
import { UserModel } from '../../../../core/models/user.model';
import { ManageUserDialogComponent } from './manage-user-dialog/manage-user-dialog.component';
import { InviteUserDialogComponent } from './invite-user-dialog/invite-user-dialog.component';
import { AddLocaleDialogComponent } from './add-locale-dialog/add-locale-dialog.component';
import { AppStateModel } from '../../../../store/models/app-state.model';
import { LocaleHelper } from '../../../../core/helpers/locale-helper';

@Component({
  selector: 'app-project-sidebar',
  templateUrl: 'project-sidebar.component.html',
  styleUrls: ['project-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectSidebarComponent implements OnInit, OnDestroy {
  @Output() activeLocaleEmit: EventEmitter<string> = new EventEmitter();

  private languagesData: LanguagesModel;
  private userData$: Observable<UserModel>;
  private languagesData$: Observable<LanguagesModel>;
  private localeAdded$: Observable<boolean>;
  private addLocaleDialogRef: MatDialogRef<AddLocaleDialogComponent>;

  public readonly uploadsEndpoint: string = UPLOADS_ENDPOINT;
  public projectData: ProjectModel;
  public defaultLocale: string;
  public activeLocale: string;
  public userData: UserModel;
  public projectData$: Observable<ProjectModel>;
  public localesData$: Observable<any>;
  public projectLoading$: Observable<boolean>;

  private userProjectLocales: any;

  public projectUpdating$: Observable<boolean>;

  private manageUserPermissionDialog: MatDialogRef<ManageUserDialogComponent>;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppStateModel>,
  ) {
  }

  ngOnInit() {
    this.projectLoading$ = this.store.select((store: AppStateModel) => store.project.loading);
    this.projectData$ = this.store.select((store: AppStateModel) => store.project.data);
    this.localesData$ = this.store.select((store: AppStateModel) => store.localesData.data);

    setTimeout(() => {
      this.projectData$
        .pipe(untilComponentDestroyed(this))
        .subscribe((projectData: ProjectModel) => {
          if (projectData) {
            this.projectData = projectData;
            this.defaultLocale = LocaleHelper.getDefaultLocale(this.projectData);
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
      .subscribe((languagesData: LanguagesModel) => {
        this.languagesData = languagesData;
      });

    this.localeAdded$ = this.store.select((store: AppStateModel) => store.localesData.added);
    this.localeAdded$
      .pipe(untilComponentDestroyed(this))
      .subscribe((state: boolean) => {
        if (state) {
          this.addLocaleDialogRef.close();
        }
      });

    this.projectUpdating$ = this.store.select((store: AppStateModel) => store.project.updating);
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
    this.userProjectLocales = this.getAvailableTranslationLocalesForUser(
      this.projectData.defaultLocale + ',' + this.projectData.translationsLocales,
      user.availableTranslationLocales + '',
    );

    this.manageUserPermissionDialog = this.dialog.open(ManageUserDialogComponent, {
      width: '600px',
      data: {
        targetUuid: user.uuid,
        projectUuid: this.projectData.uuid,
        userEmail: user.email,
        defaultLocale: this.projectData.defaultLocale,
        enabledUserLocales: user.availableTranslationLocales,
        projectLocales: this.userProjectLocales,
      },
    });

    this.manageUserPermissionDialog.componentInstance.removeUserEmit
      .pipe(untilComponentDestroyed(this))
      .subscribe((res) => {
        this.projectData.sharedUsers = this.projectData.sharedUsers.filter((u: UserModel) => u.id !== res.userId);
      });

    this.manageUserPermissionDialog.componentInstance.onAvailableTranslationsUpdate
      .pipe(untilComponentDestroyed(this))
      .subscribe((availableTranslationLocales: string) => {
        const foundUser = this.projectData.sharedWith.find((u) => u.targetId === user.id);
        const foundUserCloned = {...foundUser};
        foundUserCloned.availableTranslationLocales = availableTranslationLocales;
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
        projectUuid: this.projectData.uuid,
      },
    });
  }

  private getAvailableTranslationLocalesForUser(projectLocales: string, availableTranslationLocales: string): any[] {
    const locales = projectLocales
      .split(',')
      .map((l) => {
        return {
          checked: false,
          value: l.trim(),
        };
      });

    locales.forEach((l) => {
      availableTranslationLocales
        .split(',')
        .forEach((ll) => {
          if (l.value === ll) {
            l.checked = true;
          }
        });
    });

    return locales;
  }

  private addLocale(): void {
    this.addLocaleDialogRef = this.dialog.open(AddLocaleDialogComponent, {
        width: '500px',
        autoFocus: false,
        data: {
          projectUuid: this.projectData.uuid,
          projectTitle: this.projectData.title,
        },
      });
  }
}

import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { MatDialogRef } from '@angular/material/dialog';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { ProjectModel } from '../../../../core/models/project.model';
import { UPLOADS_ENDPOINT } from '../../../../core/app-constants';
import { UserModel } from '../../../../core/models/user.model';
import { ManageUserDialogComponent } from './manage-user-dialog/manage-user-dialog.component';
import { InviteUserDialogComponent } from './invite-user-dialog/invite-user-dialog.component';
import { AddLocaleDialogComponent } from './add-locale-dialog/add-locale-dialog.component';
import { AppStateModel } from '../../../../store/models/app-state.model';
import { TagsManagerDialogComponent } from '../../../../core/shared/tags-manager-dialog/tags-manager-dialog.component';
import { TagInterface } from '../../../../core/shared/tags-manager-dialog/tags-list/tag.model';

@Component({
  selector: 'app-project-sidebar',
  templateUrl: 'project-sidebar.component.html',
  styleUrls: ['project-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectSidebarComponent implements OnInit, OnDestroy {
  @Output() activeLocaleEmit: EventEmitter<string> = new EventEmitter();

  private userData$: Observable<UserModel>;
  private localeAdded$: Observable<boolean>;
  private addLocaleDialogRef: MatDialogRef<AddLocaleDialogComponent>;

  public readonly uploadsEndpoint: string = UPLOADS_ENDPOINT;
  public projectData: ProjectModel;
  public defaultLocale: string;
  public activeLocale: string;
  public userData: UserModel;
  public projectData$: Observable<ProjectModel>;
  public sharedUsers$: Observable<any>;
  public localesData$: Observable<any>;
  public projectLoading$: Observable<boolean>;
  private defaultLocaleObj$: Observable<any>;

  private tagsManagerDialogRef: MatDialogRef<TagsManagerDialogComponent>;

  public defaultLocaleObj: any;

  private localesData: any[];

  public projectUpdating$: Observable<boolean>;
  public tagsLoading$: Observable<boolean>;

  private manageUserPermissionDialog: MatDialogRef<ManageUserDialogComponent>;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppStateModel>,
  ) {
  }

  ngOnInit() {
    this.projectLoading$ = this.store.select((store: AppStateModel) => store.project.loading);
    this.tagsLoading$ = this.store.select((store: AppStateModel) => store.tagsData.loading);
    this.projectData$ = this.store.select((store: AppStateModel) => store.project.data);
    this.localesData$ = this.store.select((store: AppStateModel) => store.localesData.data);
    this.projectUpdating$ = this.store.select((store: AppStateModel) => store.project.updating);
    this.defaultLocaleObj$ = this.store.select((store: AppStateModel) => store.localeData.data);

    this.localesData$
      .pipe(untilComponentDestroyed(this))
      .subscribe((localesData) => {
        this.localesData = localesData;
      });

    combineLatest(
      this.defaultLocaleObj$,
      this.projectData$,
    ).subscribe((data) => {
      if (data[0] && data[1]) {
        this.defaultLocaleObj = data[0];
        this.sharedUsers$ = of(data[1].sharedUsers);
        this.projectData = data[1];
        this.defaultLocale = this.defaultLocaleObj.keyCode;
        this.activeLocale = this.defaultLocale;
        this.activeLocaleEmit.emit(this.activeLocale);
      }
    });

    this.userData$ = this.store.select((store: AppStateModel) => store.userData.user);
    this.userData$
      .pipe(untilComponentDestroyed(this))
      .subscribe((userData: UserModel) => {
        this.userData = userData;
      });

    this.localeAdded$ = this.store.select((store: AppStateModel) => store.localesData.added);
    this.localeAdded$
      .pipe(untilComponentDestroyed(this))
      .subscribe((state: boolean) => {
        if (state && this.addLocaleDialogRef) {
          this.addLocaleDialogRef.close();
        }
      });
  }

  ngOnDestroy() {
  }

  onLocaleClick(locale: string): void {
    this.activeLocale = locale;
    this.activeLocaleEmit.emit(locale);
  }

  onManageUSerClick(user: UserModel): void {
    this.manageUserPermissionDialog = this.dialog.open(ManageUserDialogComponent, {
      width: '600px',
      data: {
        userAvatar: user.avatar,
        userName: user.name,
        targetUuid: user.uuid,
        targetEmail: user.email,
        userRole: user.role,
        enabledUserLocales: user.availableTranslationLocales,
        projectUuid: this.projectData.uuid,
        projectTitle: this.projectData.title,
        defaultLocale: this.projectData.defaultLocale,
        userProjectLocales: this.getAvailableTranslationLocalesForUser(
          this.localesData,
          user.availableTranslationLocales + '',
        ),
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
      width: '600px',
      data: {
        projectUuid: this.projectData.uuid,
        projectTitle: this.projectData.title,
        userProjectLocales: this.getAvailableTranslationLocalesForUser(
          this.localesData,
          '',
        ),
      },
    });
  }

  public manageTagsClick(): void {
    this.tagsManagerDialogRef = this.dialog.open(TagsManagerDialogComponent, {
      width: '400px',
      data: {
        projectUuid: this.projectData.uuid,
      },
    });
  }

  private prepareTagsList(): TagInterface[] {
    return this.projectData.labels.map((label) => {
      return {
        ...label,
        selected: false,
      };
    });
  }

  private getAvailableTranslationLocalesForUser(projectLocales: any[], availableTranslationLocales: string): any[] {
    return projectLocales.reduce((acc: any[], curr: any) => {
      const o: any = {};
      o.checked = false;
      curr = {...curr, ...o};
      availableTranslationLocales
        .split(',')
        .forEach((code: string) => {
          if (curr.keyCode === code) {
            curr.checked = true;
          }
        });
      acc.push(curr);
      return acc;
    }, []);
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

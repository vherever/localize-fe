import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { ProjectModel } from '../../../../core/models/project.model';
import { UPLOADS_ENDPOINT } from '../../../../core/app-constants';
import { LocalesModel } from '../../../../core/models/locales.model';
import { AppDataGlobalStorageService } from '../../../../core/services/app-data-global-storage.service';
import { filter, take } from 'rxjs/operators';
import { UserModel } from '../../../../core/models/user.model';
import { MatDialog } from '@angular/material';
import { ManageUserDialogComponent } from './manage-user-dialog/manage-user-dialog.component';
import { InviteUserDialogComponent } from './invite-user-dialog/invite-user-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { AddLocaleDialogComponent } from './add-locale-dialog/add-locale-dialog.component';

@Component({
  selector: 'app-project-sidebar',
  templateUrl: 'project-sidebar.component.html',
  styleUrls: ['project-sidebar.component.scss'],
})
export class ProjectSidebarComponent implements OnChanges, OnInit, OnDestroy {
  @Input() projectData: ProjectModel;
  @Output() activeLocaleEmit: EventEmitter<string> = new EventEmitter();

  projectLocales: string[];
  defaultLocale: string;
  activeLocale: string;
  uploadsEndpoint: string;
  localesData: LocalesModel;
  userData: UserModel;

  constructor(
    private appDataGlobalStorageService: AppDataGlobalStorageService,
    private dialog: MatDialog,
  ) {
    this.uploadsEndpoint = UPLOADS_ENDPOINT;
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes.projectData.currentValue) {
    //   const translations = this.projectData.role === 'administrator' ?
    //     `${this.projectData.defaultLocale},${this.projectData.translationsLocales}` :
    //     this.projectData.availableTranslationLocales;
    //   this.projectLocales = translations
    //     .split(',')
    //     .filter((value, index, self) => {
    //       return self.indexOf(value) === index;
    //     }).filter((v) => v !== '');
    //   this.activeLocale = this.projectData.defaultLocale;
    //   this.activeLocaleEmit.emit(this.activeLocale);
    // }

    if (changes.projectData.currentValue) {
      this.defaultLocale = this.projectData.defaultLocale;
      const projectLocales = this.projectData.translationsLocales ? this.projectData.translationsLocales : '';
      this.projectLocales = projectLocales
      // const locales = this.projectData.role === 'administrator' ? `${this.projectData.defaultLocale},${this.projectData.translationsLocales}` : `${this.projectData.availableTranslationLocales}`
      // this.projectLocales = locales
        .split(',')
        .filter((value, index, self) => {
          return self.indexOf(value) === index;
        });
      this.activeLocale = this.projectData.defaultLocale;
      this.activeLocaleEmit.emit(this.activeLocale);
    }
  }

  ngOnInit() {
    this.appDataGlobalStorageService.localesData
      .pipe(
        filter((r) => r as LocalesModel | any),
        take(1),
        untilComponentDestroyed(this),
      )
      .subscribe((res: LocalesModel) => {
        this.localesData = res;
      });

    this.appDataGlobalStorageService.userData
      .pipe(
        filter((res) => res !== undefined),
        take(1),
        untilComponentDestroyed(this),
      )
      .subscribe((res: UserModel) => {
        this.userData = res;
      });
  }

  ngOnDestroy() {
  }

  get flag(): string {
    // this.localesData
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
        projectLocales: this.getAvailableTranslationLocalesForUser(user.id),
      },
    });

    dialogRef.componentInstance.removeUserEmit
      .pipe(untilComponentDestroyed(this))
      .subscribe((res) => {
        this.projectData.sharedUsers = this.projectData.sharedUsers.filter((u: UserModel) => u.id !== res.userId);
      });

    dialogRef.componentInstance.onAvailableTranslationsUpdate
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
    const projectLocales = this.projectLocales.map((l) => {
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
        width: '400px',
        data: {
          projectId: this.projectData.id,
        },
      });
  }
}

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
    if (changes.projectData.currentValue) {
      this.projectLocales = this.getProjectLocales(this.projectData);
      this.defaultLocale = this.getDefaultLocale(this.projectData);
      this.activeLocale = this.defaultLocale;
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
    const d = projectLocales
      .split(',')
      .filter((value, index, self) => {
        return self.indexOf(value) === index && value !== '';
      });
    d.unshift(projectData.defaultLocale);
    console.log('projectData.translationsLocales', projectData.translationsLocales);
    console.log('d', d);
    return d;
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

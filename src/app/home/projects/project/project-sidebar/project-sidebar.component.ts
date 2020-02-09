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

@Component({
  selector: 'app-project-sidebar',
  templateUrl: 'project-sidebar.component.html',
  styleUrls: ['project-sidebar.component.scss'],
})
export class ProjectSidebarComponent implements OnChanges, OnInit, OnDestroy {
  @Input() projectData: ProjectModel;
  @Output() activeLocaleEmit: EventEmitter<string> = new EventEmitter();

  projectLocales: string[];
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
      this.projectLocales = `${this.projectData.defaultLocale},${this.projectData.translationsLocales}`
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

  onManageUSerClick(id: number): void {
    console.log('___ id', id); // todo
    const dialogRef = this.dialog.open(ManageUserDialogComponent, {
      width: '250px',
    });
  }
}

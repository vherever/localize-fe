import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { TranslationsService } from '../../../../core/services/api-interaction/translations.service';
import { TranslationModel } from '../../../../core/models/translation.model';
import { TranslationEditorComponent } from './translation-editor/translation-editor.component';
import { AppDataGlobalStorageService } from '../../../../core/services/app-data-global-storage.service';
import { TranslationAddDialogComponent } from '../../../translation-add-dialog/translation-add-dialog.component';
import { ProjectModel } from '../../../../core/models/project.model';
import { RemoveDialogConfirmComponent } from '../../../../core/shared/remove-dialog-confirm/remove-dialog-confirm.component';
import { UserModel } from '../../../../core/models/user.model';
import { LocalesModel } from '../../../../core/models/locales.model';
import { LocalesHelper } from '../../../../core/helpers/locales-helper';
import { Store } from '@ngrx/store';
import { AppStateModel } from '../../../../store/models/app-state.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-translations',
  templateUrl: 'translations.component.html',
  styleUrls: ['translations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslationsComponent extends LocalesHelper implements OnInit, OnChanges, OnDestroy {
  @ViewChildren('translationEditor', { read: ViewContainerRef }) translationContainers: QueryList<ViewContainerRef>;
  private projectData: ProjectModel;
  @Input() activeLocale: string;

  private previousElement: ViewContainerRef;
  private previousClickedElementId: number;
  private localesData: LocalesModel;

  private userData$: Observable<UserModel>;
  private projectData$: Observable<ProjectModel>;

  translations: TranslationModel[];
  componentRef: ComponentRef<TranslationEditorComponent>;
  currentClickedElementId: number;
  activeLocaleCountryName: string;
  userId: number;

  constructor(
    private route: ActivatedRoute,
    private translationService: TranslationsService,
    private resolver: ComponentFactoryResolver,
    private appDataGlobalStorageService: AppDataGlobalStorageService,
    private translationsService: TranslationsService,
    private dialog: MatDialog,
    private store: Store<AppStateModel>,
  ) {
    super();
  }

  ngOnInit() {
    this.projectData$ = this.store.select((store: AppStateModel) => store.project.data);
    this.projectData$
      .subscribe((projectData: ProjectModel) => {
        this.projectData = projectData;
        if (projectData) {
          this.getTranslationsById(projectData.uuid);
        }
      });

    this.userData$ = this.store.select((store: AppStateModel) => store.userData.user);
    this.userData$
      .subscribe((userData: UserModel) => {
        if (userData) {
          this.userId = userData.id;
        }
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.activeLocale.currentValue) {
      if (!this.localesData) {
        this.appDataGlobalStorageService.localesData
          .pipe(untilComponentDestroyed(this))
          .subscribe((res) => {
            this.localesData = res;
            if (this.localesData) {
              this.activeLocaleCountryName = this.getActiveLocaleCountryName(this.activeLocale, this.localesData);
            }
          });
      } else {
        this.activeLocaleCountryName = this.getActiveLocaleCountryName(this.activeLocale, this.localesData);
      }
    }

    if (!this.componentRef) {
      return;
    }
    this.componentRef.instance.activeLocale = this.activeLocale;
    this.componentRef.instance.activeLocaleCountryName = this.activeLocaleCountryName;
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  onTranslationEditClick(event: MouseEvent, translation: TranslationModel, index: number): void {
    // TODO refactor this.
    // console.log('___ event', event); // todo
    if (event.srcElement['nodeName'].toLocaleLowerCase() === 'span' ||
      event.srcElement['nodeName'].toLocaleLowerCase() === 'a') {
      this.currentClickedElementId = null;
      if (this.previousElement) {
        this.previousElement.clear();
      }
      if (this.previousClickedElementId === index) {
        this.previousElement.clear();
        this.previousClickedElementId = null; // reset value to make checking again
      } else {
        if (event.target['className'] === 'lz_remove') {
          this.removeTranslation(translation);
        } else {
          this.currentClickedElementId = index;
          this.previousClickedElementId = index;
          this.createComponent(translation, index);
          this.updateTranslation(translation.uuid);
        }
      }
    } else {
      if (event.target['parentNode'].className === 'lz_remove' || event.target['parentNode'].className.baseVal === 'lz_remove_svg') {
        this.removeTranslation(translation);
      }
    }
  }

  onAddTranslationClick(): void {
    this.onOpenAddTranslationDialog();
  }

  private onOpenAddTranslationDialog(): void {
    const dialogRef: MatDialogRef<TranslationAddDialogComponent> =
      this.dialog.open(TranslationAddDialogComponent, {
        width: '500px',
        data: this.projectData,
      });

    dialogRef.componentInstance.addedTranslation
      .pipe(untilComponentDestroyed(this))
      .subscribe((res: TranslationModel) => {
        console.log('res', res);
        this.translations.push(res);
        dialogRef.close();
      });
  }

  private getTranslationsById(id: string): void {
    this.translationService.getTranslationsById(id)
      .pipe(untilComponentDestroyed(this))
      .subscribe((res: TranslationModel[]) => {
        console.log('res translations', res);
        this.translations = res;
      });
  }

  private createComponent(translation: TranslationModel, index: number) {
    const nativeEl = this.translationContainers.toArray()[index];
    this.previousElement = nativeEl;
    const factory = this.resolver.resolveComponentFactory(TranslationEditorComponent);
    this.componentRef = nativeEl.createComponent(factory);
    this.componentRef.instance.translation = translation;
    this.componentRef.instance.projectData = this.projectData;
    this.componentRef.instance.activeLocale = this.activeLocale;
    this.componentRef.instance.activeLocaleCountryName = this.activeLocaleCountryName;
    this.componentRef.instance.localesData = this.localesData;
  }

  private updateTranslation(translationId: string): void {
    this.componentRef.instance.newTranslationData
      .pipe(untilComponentDestroyed(this))
      .subscribe((data) => {
        this.translationsService.updateTranslation(this.projectData.uuid, translationId, data)
          .pipe(untilComponentDestroyed(this))
          .subscribe((res: TranslationModel[]) => {
            const updatedTranslation = res[0];
            const index = this.translations.findIndex((e) => e.id === updatedTranslation.id);
            this.translations[index] = updatedTranslation;
            this.previousClickedElementId = null;
            this.currentClickedElementId = null;
          });
      });
  }

  private removeTranslation(translation: TranslationModel): void {
    const dialogRef = this.dialog.open(RemoveDialogConfirmComponent, {
      width: '500px',
      data: `Do you really want to remove the translation asset
      <b>${translation.assetCode}</b> across
      <b>${this.projectLocalesCount}</b> locales?`,
    });

    dialogRef.afterClosed()
      .pipe(untilComponentDestroyed(this))
      .subscribe((state: boolean) => {
        if (state) {
          this.translationService.removeTranslation(this.projectData.uuid, translation.uuid)
            .pipe(untilComponentDestroyed(this))
            .subscribe(() => {
              this.translations = this.translations.filter((t: TranslationModel) => t.id !== translation.id);
            });
        }
      });
  }

  private get projectLocalesCount(): number {
    return this.projectData.translationsLocales.split(',').length;
  }
}

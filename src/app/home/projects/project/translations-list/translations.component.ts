import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList, SimpleChanges,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
// app imports
import { TranslationsService } from '../../../../core/services/api-interaction/translations.service';
import { TranslationModel } from '../../../../core/models/translation.model';
import { TranslationEditorComponent } from './translation-editor/translation-editor.component';
import { TranslationAddDialogComponent } from '../../../translation-add-dialog/translation-add-dialog.component';
import { ProjectModel } from '../../../../core/models/project.model';
import { RemoveDialogConfirmComponent } from '../../../../core/shared/remove-dialog-confirm/remove-dialog-confirm.component';
import { UserModel } from '../../../../core/models/user.model';
import { LanguagesModel } from '../../../../core/models/languages.model';
import { LanguagesHelper } from '../../../../core/helpers/languages-helper';
import { AppStateModel } from '../../../../store/models/app-state.model';
import { CancelLoadTranslationsAction, ClearTranslationsAction, LoadTranslationsAction, RemoveTranslationAction } from '../../../../store/actions/translations.action';

@Component({
  selector: 'app-translations',
  templateUrl: 'translations.component.html',
  styleUrls: ['translations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslationsComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChildren('translationEditor', { read: ViewContainerRef }) translationContainers: QueryList<ViewContainerRef>;
  @Input() activeLocale: any;
  @Input() projectData: ProjectModel;

  private previousElement: ViewContainerRef;
  private previousClickedElementId: number;
  private languagesData: LanguagesModel;
  private projectId: string;
  private translationAdded$: Observable<boolean>;
  private addTranslationDialogRef: MatDialogRef<TranslationAddDialogComponent>;
  private languagesData$: Observable<LanguagesModel>;
  private userData$: Observable<UserModel>;
  public translationsLoading$: Observable<boolean>;
  public translationsData$: Observable<any>;
  public localesData$: Observable<any>;

  private localesData: string[];

  componentRef: ComponentRef<TranslationEditorComponent>;
  currentClickedElementId: number;
  activeLocaleObj: any;
  userId: number;

  constructor(
    private route: ActivatedRoute,
    private translationService: TranslationsService,
    private resolver: ComponentFactoryResolver,
    private translationsService: TranslationsService,
    private dialog: MatDialog,
    private store: Store<AppStateModel>,
  ) {
    this.route.params
      .pipe(untilComponentDestroyed(this))
      .subscribe((params) => {
        this.projectId = params['id'];
      });
  }

  ngOnInit() {
    this.translationAdded$ = this.store.select((store: AppStateModel) => store.translationsData.added);
    this.getTranslationsById(this.projectId);

    this.userData$ = this.store.select((store: AppStateModel) => store.userData.user);
    this.userData$
      .subscribe((userData: UserModel) => {
        if (userData) {
          this.userId = userData.id;
        }
      });

    this.translationsData$ = this.store.select((store: AppStateModel) => store.translationsData.data);
    this.translationsLoading$ = this.store.select((store: AppStateModel) => store.translationsData.loading);

    this.languagesData$ = this.store.select((store: AppStateModel) => store.languagesData.data);

    this.languagesData$
      .subscribe((languagesData) => {
        if (languagesData && this.activeLocale) {
          const languagesDataForFilter = LanguagesHelper.formatData(languagesData);
          this.languagesData = languagesDataForFilter;
          this.activeLocaleObj = LanguagesHelper.getActiveLocaleObj(this.activeLocale, languagesDataForFilter);
        }
      });

    this.translationAdded$
      .pipe(untilComponentDestroyed(this))
      .subscribe((state: boolean) => {
        if (state && this.addTranslationDialogRef) {
          this.addTranslationDialogRef.close();
        }
      });

    this.localesData$ = this.store.select((store: AppStateModel) => store.localesData.data);
    this.localesData$
      .pipe(untilComponentDestroyed(this))
      .subscribe((localesData: string[]) => {
        this.localesData = localesData;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.activeLocale.currentValue && this.languagesData) {
      this.activeLocaleObj = LanguagesHelper.getActiveLocaleObj(this.activeLocale, this.languagesData);
    }

    if (!this.componentRef) {
      return;
    }

    this.componentRef.instance.activeLocale = this.activeLocale;
    this.componentRef.instance.activeLocaleObj = this.activeLocaleObj;
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.store.dispatch(new CancelLoadTranslationsAction());
    this.store.dispatch(new ClearTranslationsAction());
  }

  onTranslationEditClick(event: MouseEvent, translation: TranslationModel, index: number): void {
    // if (event.target['localName'] === 'span' || event.target['localName'] === 'a') {
    if (event.target['className'].includes('lz_clickable')) {
      if (this.previousElement && event.target['className'] !== 'lz_remove' && event.target['className'] !== 'lz_settings') {
        this.currentClickedElementId = null;
        this.previousElement.clear();
      }
      if (this.previousClickedElementId === index) {
        if (event.target['className'] !== 'lz_remove' && event.target['className'] !== 'lz_settings') {
          this.previousClickedElementId = null; // reset value to make checking again
          this.previousElement.clear();
        } else if (event.target['className'] === 'lz_remove') {
          this.removeTranslation(translation);
        } else if (event.target['className'] === 'lz_settings') {
          console.log('lz_settings');
        }
      } else {
        if (event.target['className'] === 'lz_remove') {
          this.removeTranslation(translation);
        } else if (event.target['className'] === 'lz_settings') {
          console.log('lz_settings');
        } else {
          this.currentClickedElementId = index;
          this.previousClickedElementId = index;
          this.createComponent(translation, index);
        }
      }
    } else {
      if (event.target['className'] === 'lz_settings') {
        console.log('lz_settings');
      } else if (event.target['className'] === 'lz_remove') {
        this.removeTranslation(translation);
      }
    }
  }

  onAddTranslationClick(): void {
    this.addTranslationDialogRef = this.dialog.open(TranslationAddDialogComponent, {
        width: '500px',
        data: {
          projectData: this.projectData,
          activeLocaleObj: this.activeLocaleObj,
          activeLocale: this.activeLocale,
        },
      });
    this.translationAdded$ = of(false);
  }

  private getTranslationsById(id: string): void {
    this.store.dispatch(new LoadTranslationsAction(id));
  }

  private createComponent(translation: TranslationModel, index: number) {
    const nativeEl = this.translationContainers.toArray()[index];
    this.previousElement = nativeEl;
    const factory = this.resolver.resolveComponentFactory(TranslationEditorComponent);
    this.componentRef = nativeEl.createComponent(factory);
    this.componentRef.instance.translation = translation;
    this.componentRef.instance.projectData = this.projectData;
    this.componentRef.instance.localesData = this.localesData;
    this.componentRef.instance.activeLocale = this.activeLocale;
    this.componentRef.instance.activeLocaleObj = this.activeLocaleObj;
    this.componentRef.instance.languagesData = this.languagesData;
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
          this.store.dispatch(new RemoveTranslationAction(this.projectData.uuid, translation.uuid));
        }
      });
  }

  private get projectLocalesCount(): number {
    if (this.projectData.translationsLocales) {
      return this.projectData.translationsLocales.split(',').length;
    }
    return 1;
  }
}

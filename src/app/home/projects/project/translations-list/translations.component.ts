import { Component, ComponentFactoryResolver, ComponentRef, Input, OnChanges, OnDestroy, QueryList, SimpleChanges, ViewChildren, ViewContainerRef } from '@angular/core';
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

@Component({
  selector: 'app-translations',
  templateUrl: 'translations.component.html',
  styleUrls: ['translations.component.scss'],
})
export class TranslationsComponent implements OnChanges, OnDestroy {
  @ViewChildren('translationEditor', { read: ViewContainerRef }) translationContainers: QueryList<ViewContainerRef>;
  @Input() projectData: ProjectModel;

  private previousElement: ViewContainerRef;
  private previousClickedElementId: number;

  translations: TranslationModel[];
  componentRef: ComponentRef<TranslationEditorComponent>;
  currentClickedElementId: number;

  constructor(
    private route: ActivatedRoute,
    private translationService: TranslationsService,
    private resolver: ComponentFactoryResolver,
    private appDataGlobalStorageService: AppDataGlobalStorageService,
    private translationsService: TranslationsService,
    private dialog: MatDialog,
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.projectData.currentValue) {
      this.getTranslationsById(this.projectData.id);
    }
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  onTranslationEditClick(event: MouseEvent, translation: TranslationModel, index: number): void {
    if (event.srcElement.nodeName.toLocaleLowerCase() === 'span' ||
      event.srcElement.nodeName.toLocaleLowerCase() === 'a') {
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
          this.updateTranslation(translation.id);
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
        this.translations.push(res);
        dialogRef.close();
      });
  }

  private getTranslationsById(id: number): void {
    this.translationService.getTranslationsById(id)
      .pipe(untilComponentDestroyed(this))
      .subscribe((res: TranslationModel[]) => {
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
  }

  private updateTranslation(translationId: number): void {
    this.componentRef.instance.newTranslationData
      .pipe(untilComponentDestroyed(this))
      .subscribe((data) => {
        this.translationsService.updateTranslation(this.projectData.id, translationId, data)
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
          this.translationService.removeTranslation(this.projectData.id, translation.id)
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

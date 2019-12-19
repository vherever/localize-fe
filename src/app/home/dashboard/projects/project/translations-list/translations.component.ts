import { Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { TranslationsService } from '../../../../../core/services/api-interaction/translations.service';
import { TranslationModel } from '../../../../../core/models/translation.model';
import { TranslationEditorComponent } from './translation-editor/translation-editor.component';
import { UserModel } from '../../../../../core/models/user.model';
import { AppDataGlobalStorageService } from '../../../../../core/services/app-data-global-storage.service';
import { TranslationAddDialogComponent } from '../../../../translation-add-dialog/translation-add-dialog.component';
import { ProjectModel } from '../../../../../core/models/project.model';

@Component({
  selector: 'app-translations',
  templateUrl: 'translations.component.html',
  styleUrls: ['translations.component.scss'],
})
export class TranslationsComponent implements OnInit, OnDestroy {
  @ViewChildren('translationEditor', { read: ViewContainerRef }) translationContainers: QueryList<ViewContainerRef>;

  private previousElement: ViewContainerRef;
  private previousClickedElementId: number;
  private projectId: number;
  private projectData: ProjectModel;

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

  ngOnInit() {
    this.route.params
      .pipe(untilComponentDestroyed(this))
      .subscribe((params) => {
        this.getTranslationsById(+params['id']);
        this.projectId = +params['id'];
      });

    this.appDataGlobalStorageService.userData
      .pipe(untilComponentDestroyed(this))
      .subscribe((res: UserModel) => {
        this.projectData = res && res.projects.find((p: ProjectModel) => p.id === this.projectId);
      });
  }

  ngOnDestroy() {
    if (this.componentRef) { this.componentRef.destroy(); }
  }

  onTranslationEditClick(event: any, translation: TranslationModel, index: number): void {
    if (event.srcElement.className.search('lz_translation') > -1 || event.srcElement.className.search('lz_assetCode') > -1) {
      this.currentClickedElementId = null;
      if (this.previousElement) {
        this.previousElement.clear();
      }
      if (this.previousClickedElementId === index) {
        this.previousElement.clear();
        this.previousClickedElementId = null; // reset value to make checking again
      } else {
        this.currentClickedElementId = index;
        this.previousClickedElementId = index;
        this.createComponent(translation, index);
        this.updateTranslation(translation.id);
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
    this.componentRef.instance.projectId = this.projectId;
    this.componentRef.instance.translation = translation;
    this.componentRef.instance.projectData = this.projectData;
  }

  private updateTranslation(translationId: number): void {
    this.componentRef.instance.newTranslationData
      .pipe(untilComponentDestroyed(this))
      .subscribe((data) => {
        this.translationsService.updateTranslation(this.projectId, translationId, data)
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
}

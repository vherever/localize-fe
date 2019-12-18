import { Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { Subscription } from 'rxjs';
// app imports
import { TranslationsService } from './translations.service';
import { TranslationModel } from '../../../../../core/models/translation.model';
import { TranslationEditorComponent } from './translation-editor/translation-editor.component';
import { UserModel } from '../../../../../core/models/user.model';
import { AppDataGlobalStorageService } from '../../../../../core/services/app-data-global-storage.service';

@Component({
  selector: 'app-translations',
  templateUrl: 'translations.component.html',
  styleUrls: ['translations.component.scss'],
})
export class TranslationsComponent implements OnInit, OnDestroy {
  @ViewChildren('translationEditor', { read: ViewContainerRef }) translationContainers: QueryList<ViewContainerRef>;

  private previousElement: ViewContainerRef;
  private previousClickedElementId: number;
  private sub1: Subscription;
  private userData: UserModel;
  private projectId: number;

  translations: TranslationModel[];
  componentRef: ComponentRef<TranslationEditorComponent>;
  currentClickedElementId: number;

  constructor(
    private route: ActivatedRoute,
    private translationService: TranslationsService,
    private resolver: ComponentFactoryResolver,
    private appDataGlobalStorageService: AppDataGlobalStorageService,
    private translationsService: TranslationsService,
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
        this.userData = res;
      });
  }

  ngOnDestroy() {
    if (this.componentRef) { this.componentRef.destroy(); }
    if (this.sub1) { this.sub1.unsubscribe(); }
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
    this.componentRef.instance.userData = this.userData;
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

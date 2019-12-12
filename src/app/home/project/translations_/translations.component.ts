import { Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { TranslationsService } from './translations.service';
import { TranslationModel } from '../../../core/models/translation.model';
import { TranslateEditorComponent } from './translate-editor/translate-editor.component';

@Component({
  selector: 'app-translations',
  templateUrl: 'translations.component.html',
  styleUrls: ['translations.component.scss'],
})
export class TranslationsComponent implements OnInit, OnDestroy {
  @ViewChildren('translationEditor', { read: ViewContainerRef }) translationContainers: QueryList<ViewContainerRef>;

  private previousElement: ViewContainerRef;
  private previousClickedElementId: number;

  translations: TranslationModel[];
  componentRef: ComponentRef<TranslateEditorComponent>;
  currentClickedElementId: number;

  constructor(
    private route: ActivatedRoute,
    private translationService: TranslationsService,
    private resolver: ComponentFactoryResolver,
  ) {
  }

  ngOnInit() {
    this.route.params
      .pipe(untilComponentDestroyed(this))
      .subscribe((params) => {
        this.getTranslationsById(+params['id']);
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
      }

    }
  }

  private getTranslationsById(id: number): void {
    this.translationService.getTranslationsById(id)
      .pipe(untilComponentDestroyed(this))
      .subscribe((res: TranslationModel[]) => {
        console.log('___ translations', res); // todo
        this.translations = res;
      });
  }

  private createComponent(translation: TranslationModel, index: number) {
    const nativeEl = this.translationContainers.toArray()[index];
    this.previousElement = nativeEl;
    const factory = this.resolver.resolveComponentFactory(TranslateEditorComponent);
    this.componentRef = nativeEl.createComponent(factory);
    this.componentRef.instance.translation = translation;
  }
}

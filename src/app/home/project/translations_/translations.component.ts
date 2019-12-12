import { Component, ComponentFactoryResolver, OnDestroy, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { TranslationsService } from './translations.service';
import { TranslationModel } from '../../../core/models/translation.model';
import { TranslateEditorComponent } from './translate-editor/translate-editor.component';

@Component({
  selector: 'app-translations',
  templateUrl: 'translations.component.html',
})
export class TranslationsComponent implements OnInit, OnDestroy {
  @ViewChild('templateTranslationEditor') templateTranslationEditor: TemplateRef<any>;
  @ViewChildren('translationEditor', { read: ViewContainerRef }) divs: QueryList<ViewContainerRef>;

  private previousElement: ViewContainerRef;

  translations: TranslationModel[];
  componentRef: any;

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

  onTranslationEditClick(translation: TranslationModel, index: number): void {
    if (this.previousElement) {
      this.previousElement.clear();
    }
    this.createComponent(translation, index);
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
    const nativeEl = this.divs.toArray()[index];
    this.previousElement = nativeEl;
    const factory = this.resolver.resolveComponentFactory(TranslateEditorComponent);
    this.componentRef = nativeEl.createComponent(factory);
    this.componentRef.instance.translation = translation;
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { TranslationsService } from './translations.service';
import { TranslationModel } from '../../../core/models/translation.model';

@Component({
  selector: 'app-translations',
  templateUrl: 'translations.component.html',
})
export class TranslationsComponent implements OnInit, OnDestroy {
  translations: TranslationModel[];

  constructor(
    private route: ActivatedRoute,
    private translationService: TranslationsService,
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
  }

  getTranslationsById(id: number): void {
    this.translationService.getTranslationsById(id)
      .pipe(untilComponentDestroyed(this))
      .subscribe((res: TranslationModel[]) => {
        console.log('___ res', res); // todo
        this.translations = res;
      });
  }
}

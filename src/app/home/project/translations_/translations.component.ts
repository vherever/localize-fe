import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslationsService } from './translations.service';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-translations',
  templateUrl: 'translations.component.html',
})
export class TranslationsComponent implements OnInit, OnDestroy {
  translations: any[];

  constructor(
    private route: ActivatedRoute,
    private translationService: TranslationsService,
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(untilComponentDestroyed(this))
      .subscribe(params => {
        this.getTranslationsById(+params['id']);
      });
  }

  ngOnDestroy() {}

  getTranslationsById(id: number): void {
    this.translationService.getTranslationsById(id)
      .pipe(untilComponentDestroyed(this))
      .subscribe((res) => {
        this.translations = res;
      });
  }
}

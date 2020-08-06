import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { FormBuilder, FormGroup } from '@angular/forms';
// app imports
import { LocalesHelper } from '../../helpers/locales-helper';
import { AppDataGlobalStorageService } from '../../services/app-data-global-storage.service';
import { LocaleModelFormatted } from '../../models/locales.model';

@Component({
  selector: 'app-country-search-autocomplete',
  templateUrl: 'country-search-autocomplete.component.html',
  styleUrls: ['country-search-autocomplete.component.scss'],
})
export class CountrySearchAutocompleteComponent extends LocalesHelper implements OnInit, OnDestroy {
  @Output() languageSelectedEmit: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('selectEl', {static: false}) selectEl: ElementRef;

  private inputLanguageSearch: Subject<string> = new Subject<string>();
  private originalData: any[];
  private localesDataTransformed: any = [];
  private localesDataForFilter: any;
  private selectDataLoading: boolean;
  private dropdownIsOpen: boolean;

  private group: FormGroup;

  private readonly defaultLanguage: string = 'gb-en';

  constructor(
    private appDataGlobalStorageService: AppDataGlobalStorageService,
    private fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit() {
    this.group = this.fb.group({
      defaultLocale: [this.defaultLanguage],
    });

    this.appDataGlobalStorageService.localesData
      .pipe(untilComponentDestroyed(this))
      .subscribe((res) => {
        this.localesDataForFilter = res;
        this.originalData = JSON.parse(JSON.stringify(this.localesDataForFilter));
        this.localesDataTransformed = this.getResult('', this.originalData);
        this.languageSelectedEmit.emit(this.defaultLanguage);
      });

    this.inputLanguageSearch.pipe(
      debounceTime(200),
      distinctUntilChanged())
      .subscribe((value: any) => {
        if (value.term) {
          this.localesDataTransformed = this.getResult(value.term, this.originalData);
          this.dropdownIsOpen = true;
        } else {
          this.localesDataTransformed = [];
          this.dropdownIsOpen = false;
        }
        this.selectDataLoading = false;
      });
  }

  ngOnDestroy() {}

  private onLanguageSearch(event): void {
    if (event.term !== null) {
      this.inputLanguageSearch.next(event);
      this.selectDataLoading = true;
    } else {
      this.localesDataTransformed = null;
      this.dropdownIsOpen = false;
    }
  }

  private onCloseSearchBox(): void {
    this.dropdownIsOpen = false;
  }

  private onFocusSearchBar(e): void {
    if (e.target.value) {
      const originalData = JSON.parse(JSON.stringify(this.localesDataForFilter));
      this.localesDataTransformed = this.getResult(e.target.value, originalData);
      this.dropdownIsOpen = true;
    }

  }

  private onChangeSearchBar(value: LocaleModelFormatted): void {
    if (value) {
      this.languageSelectedEmit.emit(value.keyCode);
      this.dropdownIsOpen = false;
    } else {
      this.languageSelectedEmit.emit(null);
    }
  }

  private onClearSearchBar(): void {
    this.dropdownIsOpen = false;
  }
}

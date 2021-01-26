import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { LanguagesHelper } from '../../helpers/languages-helper';
import { LocaleModelFormatted, LanguagesModel } from '../../models/languages.model';
import { AppStateModel } from '../../../store/models/app-state.model';

@Component({
  selector: 'app-country-search-autocomplete',
  templateUrl: 'country-search-autocomplete.component.html',
  styleUrls: ['country-search-autocomplete.component.scss'],
})
export class CountrySearchAutocompleteComponent implements OnInit, OnDestroy {
  @Input() labelForId: string;
  @Output() languageSelectedEmit: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('selectEl') select: NgSelectComponent;

  private inputLanguageSearch: Subject<string> = new Subject<string>();
  private originalData: any[];
  public languagesDataTransformed: any = [];
  public selectDataLoading: boolean;
  public dropdownIsOpen: boolean;
  public group: FormGroup;
  private readonly defaultLanguage: string = 'gb-en';
  private languagesData$: Observable<LanguagesModel[]>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateModel>,
  ) {
  }

  ngOnInit() {
    this.group = this.fb.group({
      defaultLocale: [this.defaultLanguage],
    });

    this.languagesData$ = this.store.select((store: AppStateModel) => store.languagesData.data);
    this.languagesData$
      .pipe(untilComponentDestroyed(this))
      .subscribe((languagesData: any[]) => {
        this.originalData = [...languagesData];
        this.languagesDataTransformed = languagesData;
        this.languageSelectedEmit.emit(this.defaultLanguage);
        setTimeout(() => {
          this.select.blur();
        }, 0);
      });

    this.inputLanguageSearch.pipe(
      debounceTime(200),
      distinctUntilChanged())
      .pipe(untilComponentDestroyed(this))
      .subscribe((value: any) => {
        if (value.term) {
          this.languagesDataTransformed = LanguagesHelper.getResult(value.term, this.originalData);
          this.dropdownIsOpen = true;
        } else {
          this.languagesDataTransformed = [];
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
      this.languagesDataTransformed = null;
      this.dropdownIsOpen = false;
    }
  }

  private onCloseSearchBox(): void {
    this.dropdownIsOpen = false;
  }

  private onFocusSearchBar(e): void {
    this.dropdownIsOpen = true;
  }

  private onChangeSearchBar(value: LocaleModelFormatted): void {
    if (value) {
      this.languageSelectedEmit.emit(value.keyCode);
      this.dropdownIsOpen = false;
    } else {
      this.languageSelectedEmit.emit(null);
    }
    this.select.blur();
  }

  private onClearSearchBar(): void {
    this.dropdownIsOpen = false;
    this.languagesDataTransformed = this.originalData;
  }
}

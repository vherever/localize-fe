import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
// app imports
import { LanguagesHelper } from '../../helpers/languages-helper';
import { LocaleModelFormatted, LanguagesModel } from '../../models/languages.model';
import { AppStateModel } from '../../../store/models/app-state.model';

@Component({
  selector: 'app-country-search-autocomplete',
  templateUrl: 'country-search-autocomplete.component.html',
  styleUrls: ['country-search-autocomplete.component.scss'],
})
export class CountrySearchAutocompleteComponent extends LanguagesHelper implements OnInit, OnDestroy {
  @Input() labelForId: string;
  @Output() languageSelectedEmit: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('selectEl', {static: false}) select: NgSelectComponent;

  private inputLanguageSearch: Subject<string> = new Subject<string>();
  private originalData: any[];
  private languagesDataTransformed: any = [];
  private languagesDataForFilter: any;
  private selectDataLoading: boolean;
  private dropdownIsOpen: boolean;
  private group: FormGroup;
  private readonly defaultLanguage: string = 'gb-en';
  private languagesData$: Observable<LanguagesModel>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateModel>,
  ) {
    super();
  }

  ngOnInit() {
    this.group = this.fb.group({
      defaultLocale: [this.defaultLanguage],
    });

    this.languagesData$ = this.store.select((store: AppStateModel) => store.languagesData.data);
    this.languagesData$
      .subscribe((languagesData) => {
        this.languagesDataForFilter = this.formatData(languagesData);
        this.originalData = JSON.parse(JSON.stringify(this.languagesDataForFilter));
        this.languagesDataTransformed = this.getResult('', this.originalData);
        this.languageSelectedEmit.emit(this.defaultLanguage);
        setTimeout(() => {
          this.select.blur();
        }, 0);
      });

    this.inputLanguageSearch.pipe(
      debounceTime(200),
      distinctUntilChanged())
      .subscribe((value: any) => {
        if (value.term) {
          this.languagesDataTransformed = this.getResult(value.term, this.originalData);
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
    this.languagesDataTransformed = this.getResult('', this.originalData);
  }
}

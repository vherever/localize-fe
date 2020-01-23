import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { Subject } from 'rxjs';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
// app imports
import { ProjectService } from '../../core/services/api-interaction/project.service';
import { ProjectModel } from '../../core/models/project.model';
import { AppDataGlobalStorageService } from '../../core/services/app-data-global-storage.service';
import { SearchCountryAutocompleteHelper } from '../../core/helpers/search-country-autocomplete.helper';
import { LocaleModelFormatted } from '../../core/models/locales.model';

@Component({
  templateUrl: 'project-add-dialog.component.html',
  styleUrls: ['project-add-dialog.component.scss'],
})
export class ProjectAddDialogComponent extends SearchCountryAutocompleteHelper implements OnInit, OnDestroy {
  @Output() addedProject: EventEmitter<ProjectModel> = new EventEmitter();
  inputLanguageSearch: Subject<string> = new Subject<string>();

  projectAddForm: FormGroup;
  localesDataTransformed: any[];
  localesDataTransformedCopy: any[];
  localesDataForFilter: any;
  selectDataLoading: boolean;
  dropdownIsOpen = false;

  constructor(
    private fb: FormBuilder,
    private pubSubService: NgxPubSubService,
    private projectService: ProjectService,
    private appDataGlobalStorageService: AppDataGlobalStorageService,
  ) {
    super();
  }

  ngOnInit() {
    this.projectAddForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      defaultLocale: ['', Validators.required],
      translationsLocales: ['', Validators.required],
      selectedLocale: [],
    });

    this.localesDataTransformed = [];

    this.appDataGlobalStorageService.localesData
      .pipe(untilComponentDestroyed(this))
      .subscribe((res) => {
        this.localesDataForFilter = res;
      });

    this.inputLanguageSearch.pipe(
      debounceTime(200),
      distinctUntilChanged())
      .subscribe((value: any) => {
        const originalData = JSON.parse(JSON.stringify(this.localesDataForFilter));
        this.localesDataTransformed = this.getResult(value.term, originalData);
        // console.log('___ localesData', this.localesDataTransformed); // todo
        this.dropdownIsOpen = true;
        this.localesDataTransformedCopy = [...this.localesDataTransformed];
        this.selectDataLoading = false;
      });
  }

  ngOnDestroy() {
  }

  onCloseSearchBox(): void {
    // this.dropdownIsOpen = false;
    // this.localesDataTransformed = [];
  }

  onFocusSearchBar(e): void {
    if (e.target.value) {

      const originalData = JSON.parse(JSON.stringify(this.localesDataForFilter));
      this.localesDataTransformed = this.getResult(e.target.value, originalData);

      this.dropdownIsOpen = true;
    }

  }

  onLanguageSearch(event): void {
    if (event.term !== null) {
      this.inputLanguageSearch.next(event);
      this.selectDataLoading = true;
    } else {
      this.localesDataTransformed = null;
      this.dropdownIsOpen = false;
    }
  }

  onChangeSearchBar(value: LocaleModelFormatted): void {
    console.log('___ value', value); // todo
    this.dropdownIsOpen = false;
  }

  onClearSearchBar(): void {
    this.dropdownIsOpen = false;
  }

  onProjectAddFormSave(): void {
    this.projectService.createProject(this.projectAddForm.value)
      .pipe(untilComponentDestroyed(this))
      .subscribe((res: ProjectModel) => {
        this.addedProject.emit(res);
      });
  }
}

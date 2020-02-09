import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { Subject } from 'rxjs';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
// app imports
import { ProjectService } from '../../core/services/api-interaction/project.service';
import { ProjectModel } from '../../core/models/project.model';
import { AppDataGlobalStorageService } from '../../core/services/app-data-global-storage.service';
import { LocalesHelper } from '../../core/helpers/locales-helper';
import { LocaleModelFormatted } from '../../core/models/locales.model';

@Component({
  templateUrl: 'project-add-dialog.component.html',
  styleUrls: ['project-add-dialog.component.scss'],
})
export class ProjectAddDialogComponent extends LocalesHelper implements OnInit, OnDestroy {
  @Output() addedProject: EventEmitter<ProjectModel> = new EventEmitter();
  inputLanguageSearch: Subject<string> = new Subject<string>();

  projectAddForm: FormGroup;
  localesDataTransformed: any[];
  localesDataTransformedCopy: any[];
  originalData: any[];
  localesDataForFilter: any;
  selectDataLoading: boolean;
  dropdownIsOpen = false;

  private defaultLanguage: string;

  constructor(
    private fb: FormBuilder,
    private pubSubService: NgxPubSubService,
    private projectService: ProjectService,
    private appDataGlobalStorageService: AppDataGlobalStorageService,
  ) {
    super();
    this.defaultLanguage = 'gb-en';
  }

  ngOnInit() {
    this.projectAddForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      defaultLocale: ['', Validators.required],
      translationsLocales: ['', Validators.required],
    });

    this.localesDataTransformed = [];

    this.appDataGlobalStorageService.localesData
      .pipe(untilComponentDestroyed(this))
      .subscribe((res) => {
        this.localesDataForFilter = res;

        this.originalData = JSON.parse(JSON.stringify(this.localesDataForFilter));
        this.localesDataTransformed = this.getResult('', this.originalData);
        this.projectAddForm.get('defaultLocale').patchValue(this.defaultLanguage);
      });

    this.inputLanguageSearch.pipe(
      debounceTime(200),
      distinctUntilChanged())
      .subscribe((value: any) => {
        if (value.term) {
          this.localesDataTransformed = this.getResult(value.term, this.originalData);
          this.dropdownIsOpen = true;
          this.localesDataTransformedCopy = [...this.localesDataTransformed];
        } else {
          this.localesDataTransformed = [];
          this.dropdownIsOpen = false;
        }
        this.selectDataLoading = false;
      });
  }

  ngOnDestroy() {
  }

  get titleField(): FormControl {
    return this.projectAddForm.get('title') as FormControl;
  }

  get defaultLocaleField(): FormControl {
    return this.projectAddForm.get('defaultLocale') as FormControl;
  }

  onCloseSearchBox(): void {
    this.dropdownIsOpen = false;
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
    if (value) {
      this.projectAddForm.get('defaultLocale').patchValue(value.keyCode);
      this.dropdownIsOpen = false;
    }
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

  private getDefaultLanguage(data: any, key: string): LocaleModelFormatted {
    // this.projectAddForm.get('defaultLocale').patchValue(this.localesDataTransformed[210].keyCode);
    return data.filter((l: LocaleModelFormatted) => l.keyCode === key);
  }
}

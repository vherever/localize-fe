import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
// app imports
import { ProjectModel } from '../../../core/models/project.model';
import { UpdateProjectAction } from '../../../store/actions/projects.actions';
import { Observable } from 'rxjs';
import { AppStateModel } from '../../../store/models/app-state.model';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: 'project-settings-dialog.component.html',
  styleUrls: [
    'project-settings-dialog.component.scss',
    '../../../core/shared/country-search-autocomplete/country-search-autocomplete.component.scss',
  ],
})
export class ProjectSettingsDialogComponent implements OnInit {
  public settingsForm: FormGroup;
  public locales: any;
  public localesData$: Observable<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public projectData: ProjectModel,
    private fb: FormBuilder,
    private store: Store,
  ) {
  }

  ngOnInit() {
    this.settingsForm = this.fb.group({
      title: [this.projectData.title, Validators.required],
      description: [this.projectData.description],
      defaultLocale: [this.projectData.defaultLocale, Validators.required],
    });
    this.locales = this.getLocales(this.projectData);

    this.localesData$ = this.store.select((store: AppStateModel) => store.localesData.data)
      .pipe(
        map((data: any[]) => {
          return data.map((l: any, index: number) => {
            return {
              id: index,
              text: l.keyCode,
              value: l.keyCode,
              htmlTemplate: `<span class="flex flex-row justify-start items-center">
                ${l.emoji ? `<span class="text-lg">${l.emoji}</span>` : `<span class="bg-green-600 text-white py-0.5 px-1 rounded-sm text-xs">${l.code}</span> <span class="font-bold text-xs ml-1">${l.name}</span>`}
                ${l.lang ? `<span class="font-bold text-xs">${l.lang}</span>,` : ''}
                ${l.country ? `<span class="text-xs ml-1">${l.country}</span>` : ''}
              </span>`,
            };
          });
        }),
      );
  }

  get titleField(): FormControl {
    return this.settingsForm.get('title') as FormControl;
  }

  get defaultLocaleControl(): FormControl {
    return this.settingsForm.get('defaultLocale') as FormControl;
  }

  public onFormSave(): void {
    const data = {
      title: this.settingsForm.value.title,
      description: this.settingsForm.value.description,
      defaultLocale: this.settingsForm.value.defaultLocale,
    };
    this.store.dispatch(new UpdateProjectAction(data, this.projectData.uuid));
  }

  public selectOption(value: string): void {
    this.defaultLocaleControl.patchValue(value);
  }

  private getLocales(projectData: any): string[] {
    if (projectData.translationsLocales) {
      return projectData.translationsLocales.split(',');
    }
    return [];
  }
}

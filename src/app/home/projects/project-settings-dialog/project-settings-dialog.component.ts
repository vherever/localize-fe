import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
// app imports
import { ProjectModel } from '../../../core/models/project.model';
import { UpdateProjectAction } from '../../../store/actions/projects.actions';

@Component({
  templateUrl: 'project-settings-dialog.component.html',
  styleUrls: [
    'project-settings-dialog.component.scss',
    '../../../core/shared/country-search-autocomplete/country-search-autocomplete.component.scss',
  ],
})
export class ProjectSettingsDialogComponent implements OnInit {
  private settingsForm: FormGroup;
  private locales: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public projectData: ProjectModel,
    private fb: FormBuilder,
    private store: Store,
  ) {}

  ngOnInit() {
    this.settingsForm = this.fb.group({
      title: [this.projectData.title, Validators.required],
      description: [this.projectData.description],
      defaultLocale: [this.projectData.defaultLocale, Validators.required],
    });
    this.locales = this.getLocales(this.projectData);
  }

  get titleField(): FormControl {
    return this.settingsForm.get('title') as FormControl;
  }

  private onFormSave(): void {
    const data = {
      title: this.settingsForm.value.title,
      description: this.settingsForm.value.description,
      defaultLocale: this.settingsForm.value.defaultLocale,
    };
    this.store.dispatch(new UpdateProjectAction(data, this.projectData.uuid));
  }

  private getLocales(projectData: any): string[] {
    let locales: string[] = [];
    if (projectData.translationsLocales) {
      locales = projectData.translationsLocales.split(',');
    }
    locales.push(projectData.defaultLocale);
    return locales;
  }
}

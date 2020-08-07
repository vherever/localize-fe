import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { ProjectService } from '../../../core/services/api-interaction/project.service';
import { ProjectModel } from '../../../core/models/project.model';

@Component({
  templateUrl: 'project-settings-dialog.component.html',
  styleUrls: [
    'project-settings-dialog.component.scss',
    '../../../core/shared/country-search-autocomplete/country-search-autocomplete.component.scss',
  ],
})
export class ProjectSettingsDialogComponent implements OnInit, OnDestroy {
  onResponseReceived: EventEmitter<any> = new EventEmitter();

  private settingsForm: FormGroup;
  private locales: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public projectData: any,
    private fb: FormBuilder,
    private projectService: ProjectService,
  ) {}

  ngOnInit() {
    this.settingsForm = this.fb.group({
      title: [this.projectData.title, Validators.required],
      description: [this.projectData.description],
      defaultLocale: [this.projectData.defaultLocale, Validators.required],
    });
    this.locales = this.getLocales(this.projectData);
  }

  ngOnDestroy() {}

  get titleField(): FormControl {
    return this.settingsForm.get('title') as FormControl;
  }

  private onFormSave(): void {
    const data = {
      title: this.settingsForm.value.title,
      description: this.settingsForm.value.description,
      defaultLocale: this.settingsForm.value.defaultLocale,
    };
    this.projectService.updateProject(data, this.projectData.uuid)
      .pipe(untilComponentDestroyed(this))
      .subscribe((res: ProjectModel) => {
        this.onResponseReceived.emit(res);
      });
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

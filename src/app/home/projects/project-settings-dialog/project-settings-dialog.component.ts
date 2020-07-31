import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ProjectService } from '../../../core/services/api-interaction/project.service';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { ProjectModel } from '../../../core/models/project.model';

@Component({
  templateUrl: 'project-settings-dialog.component.html',
  styleUrls: ['project-settings-dialog.component.scss'],
})
export class ProjectSettingsDialogComponent implements OnInit, OnDestroy {
  onResponseReceived: EventEmitter<any> = new EventEmitter();

  private settingsForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private projectService: ProjectService,
  ) {}

  ngOnInit() {
    this.settingsForm = this.fb.group({
      title: [this.data.title, Validators.required],
      description: [this.data.description],
    });
  }

  ngOnDestroy() {}

  get titleField(): FormControl {
    return this.settingsForm.get('title') as FormControl;
  }

  // TODO: update change defaultLocale, translationsLocales
  private onFormSave(): void {
    const data = {
      title: this.settingsForm.value.title,
      description: this.settingsForm.value.description,
      defaultLocale: this.data.defaultLocale,
      translationsLocales: this.data.translationsLocales,
    };
    this.projectService.updateProject(data, this.data.uuid)
      .pipe(untilComponentDestroyed(this))
      .subscribe((res: ProjectModel) => {
        this.onResponseReceived.emit(res);
      });
  }
}

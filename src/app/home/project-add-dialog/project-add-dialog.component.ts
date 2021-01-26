import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// app imports
import { AppStateModel } from '../../store/models/app-state.model';
import { Store } from '@ngrx/store';
import { AddProjectAction } from '../../store/actions/projects.actions';

@Component({
  templateUrl: 'project-add-dialog.component.html',
  styleUrls: ['project-add-dialog.component.scss'],
})
export class ProjectAddDialogComponent implements OnInit {
  projectAddForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateModel>,
  ) {
  }

  ngOnInit() {
    this.projectAddForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      defaultLocale: ['', Validators.required],
    });
  }

  get titleField(): FormControl {
    return this.projectAddForm.get('title') as FormControl;
  }

  get defaultLocaleField(): FormControl {
    return this.projectAddForm.get('defaultLocale') as FormControl;
  }

  onProjectAddFormSave(): void {
    this.store.dispatch(new AddProjectAction(this.projectAddForm.value));
  }

  public onLanguageSelectedEmit(lang: string): void {
    if (!lang) {
      this.projectAddForm.get('defaultLocale').setErrors({ required: true });
    }
    this.projectAddForm.get('defaultLocale').patchValue(lang);
  }
}

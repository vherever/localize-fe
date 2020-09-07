import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { ProjectService } from '../../core/services/api-interaction/project.service';
import { ProjectModel } from '../../core/models/project.model';
import { LocalesHelper } from '../../core/helpers/locales-helper';
import { AppStateModel } from '../../store/models/app-state.model';
import { Store } from '@ngrx/store';
import { AddProjectAction } from '../../store/actions/projects.actions';

@Component({
  templateUrl: 'project-add-dialog.component.html',
  styleUrls: ['project-add-dialog.component.scss'],
})
export class ProjectAddDialogComponent extends LocalesHelper implements OnInit, OnDestroy {
  @Output() addedProject: EventEmitter<ProjectModel> = new EventEmitter();

  projectAddForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pubSubService: NgxPubSubService,
    private projectService: ProjectService,
    private store: Store<AppStateModel>,
  ) {
    super();
  }

  ngOnInit() {
    this.projectAddForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      defaultLocale: ['', Validators.required],
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

  onProjectAddFormSave(): void {
    this.store.dispatch(new AddProjectAction(this.projectAddForm.value));

    // this.projectService.createProject(this.projectAddForm.value)
    //   .pipe(untilComponentDestroyed(this))
    //   .subscribe((res: ProjectModel) => {
    //     this.addedProject.emit(res);
    //   });
  }

  private onLanguageSelectedEmit(lang: string): void {
    if (!lang) {
      this.projectAddForm.get('defaultLocale').setErrors({ required: true });
    }
    this.projectAddForm.get('defaultLocale').patchValue(lang);
  }
}

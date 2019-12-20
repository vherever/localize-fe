import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { ProjectService } from '../../core/services/api-interaction/project.service';
import { ProjectModel } from '../../core/models/project.model';

@Component({
  templateUrl: 'project-add-dialog.component.html',
  styleUrls: ['project-add-dialog.component.scss'],
})
export class ProjectAddDialogComponent implements OnInit, OnDestroy {
  @Output() addedProject: EventEmitter<ProjectModel> = new EventEmitter();
  projectAddForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pubSubService: NgxPubSubService,
    private projectService: ProjectService,
  ) {
  }

  ngOnInit() {
    this.projectAddForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      defaultLocale: ['', Validators.required],
      translationsLocales: ['', Validators.required],
    });
  }

  ngOnDestroy() {
  }

  onProjectAddFormSave(): void {
    this.projectService.createProject(this.projectAddForm.value)
      .pipe(untilComponentDestroyed(this))
      .subscribe((res: ProjectModel) => {
        this.addedProject.emit(res);
      });
  }
}

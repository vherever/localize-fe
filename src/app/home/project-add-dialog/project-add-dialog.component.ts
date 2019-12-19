import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { CacheService } from '@ngx-cache/core';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { ProjectService } from '../../core/services/api-interaction/project.service';
import { UserModel } from '../../core/models/user.model';
import { ProjectModel } from '../../core/models/project.model';

@Component({
  templateUrl: 'project-add-dialog.component.html',
  styleUrls: ['project-add-dialog.component.scss'],
})
export class ProjectAddDialogComponent implements OnInit, OnDestroy {
  projectAddForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pubSubService: NgxPubSubService,
    private projectService: ProjectService,
    private cacheService: CacheService,
    @Inject(MAT_DIALOG_DATA) public userData: UserModel,
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
        this.pubSubService.publishEvent('addProjectDialogOpened', false);
        this.userData.projects.push(res);
        this.cacheService.set('userData', this.userData);
        this.pubSubService.publishEvent('userDataCached', true);
      });
  }
}

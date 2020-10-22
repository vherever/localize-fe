import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Inject, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
// app imports
import { AppStateModel } from '../../../../../store/models/app-state.model';
import {
  ExcludeUserFromProjectAction,
  ManageUserPermissionAction,
  ManageUserPermissionClearState
} from '../../../../../store/actions/share-project.actions';
import { UPLOADS_ENDPOINT } from '../../../../../core/app-constants';

interface DialogData {
  targetEmail: string;
  projectUuid: string;
  targetUuid: string;
  defaultLocale: string;
  enabledUserLocales: string;
  userProjectLocales: any;
  userAvatar: string;
  userName: string;
  userRole: string;
  projectTitle: string;
}

@Component({
  templateUrl: 'manage-user-dialog.component.html',
  styleUrls: ['manage-user-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageUserDialogComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() removeUserEmit: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('languagesList', { static: false }) languagesList: ElementRef;

  onAvailableTranslationsUpdate: EventEmitter<any> = new EventEmitter();

  public readonly uploadsEndpoint: string = UPLOADS_ENDPOINT;

  private availableTranslationLocales: any[];

  public managePermissionsForm: FormGroup;

  public userProjectPermissionUpdated$: Observable<boolean>;
  public userIsExcludedFromProject$: Observable<boolean>;

  constructor(
    private dialogRef: MatDialogRef<ManageUserDialogComponent>,
    private fb: FormBuilder,
    private store: Store<AppStateModel>,
    private pubSubService: NgxPubSubService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  ngOnInit() {
    this.managePermissionsForm = this.fb.group({
      availableTranslationLocales: ['', [Validators.required]],
    });

    this.userProjectPermissionUpdated$ = this.store.select((store: AppStateModel) => store.shareProject.updated);
    this.userProjectPermissionUpdated$
      .pipe(untilComponentDestroyed(this))
      .subscribe((state: boolean) => {
        if (state) {
          this.dialogRef.close();
          this.pubSubService.publishEvent('EVENT:LOAD_PROJECT_BY_ID', this.data.projectUuid);
        }
        this.store.dispatch(new ManageUserPermissionClearState());
      });

    this.userIsExcludedFromProject$ = this.store.select((store: AppStateModel) => store.shareProject.deleted);
    this.userIsExcludedFromProject$
      .pipe(untilComponentDestroyed(this))
      .subscribe((state: boolean) => {
        if (state) {
          this.dialogRef.close();
          this.pubSubService.publishEvent('EVENT:LOAD_PROJECT_BY_ID', this.data.projectUuid);
        }
      });
  }

  ngAfterViewInit() {
    this.availableTranslationLocales = (this.languagesList as any).languagesForm.controls['availableTranslationLocales'].value;
    this.availableTranslationLocalesField.patchValue(this.availableTranslationLocales);
  }

  ngOnDestroy() {
  }

  private get availableTranslationLocalesField(): FormControl {
    return this.managePermissionsForm.get('availableTranslationLocales') as FormControl;
  }

  public onRemoveUserFromProjectClick(): void {
    this.store.dispatch(new ExcludeUserFromProjectAction(this.data.projectUuid, this.data.targetEmail));
  }

  public onUpdatePermissionsClick(): void {
    const availableTranslationLocales = this.availableTranslationLocales.reduce((acc, curr) => {
      if (curr.checked) {
        acc.push(curr.code);
        return acc;
      }
      return acc;
    }, []).join(',');

    this.store.dispatch(new ManageUserPermissionAction(
      this.data.targetUuid,
      this.data.projectUuid,
      availableTranslationLocales,
    ));
  }

  public onListChangeEventEmit(value: any): void {
    this.availableTranslationLocalesField.patchValue(this.availableTranslationLocales);
  }
}

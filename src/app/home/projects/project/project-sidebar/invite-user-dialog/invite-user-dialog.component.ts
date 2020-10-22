import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { catchError } from 'rxjs/operators';
// app imports
import { ShareProjectService } from '../../../../../core/services/api-interaction/share-project.service';
import { InviteUserModel } from '../../../../../core/models/invite-user.model';
import { ErrorModel } from '../../../../../core/models/error.model';
import { UserRoles } from '../../../../../core/app-constants';

interface UserRoleInterface {
  name: string;
  value: string;
  active: boolean;
  description: string;
}

const userRoles: UserRoleInterface[] = [
  { value: UserRoles.TRANSLATOR, name: 'translator', active: true, description: 'allow add, edit translations.' },
  { value: UserRoles.DEVELOPER, name: 'developer', active: false, description: 'extended developer features.' },
  { value: UserRoles.MANAGER, name: 'manager', active: false, description: 'can invite and exclude team members.' },
];

@Component({
  templateUrl: 'invite-user-dialog.component.html',
  styleUrls: ['invite-user-dialog.component.scss'],
})
export class InviteUserDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('languagesList', { static: false }) languagesList: ElementRef;

  private availableTranslationLocales: any;

  public inviteUserForm: FormGroup;
  public userRoles: UserRoleInterface[];

  constructor(
    private fb: FormBuilder,
    private shareProjectService: ShareProjectService,
    @Inject(MAT_DIALOG_DATA) public data: { projectUuid: string, projectTitle: string, userProjectLocales: any },
  ) {
    this.userRoles = userRoles;
  }

  ngOnInit() {
    this.inviteUserForm = this.fb.group({
      availableTranslationLocales: ['', [Validators.required]],
      email: ['', [Validators.required]],
      role: [UserRoles.TRANSLATOR, [Validators.required]],
    });
  }

  ngAfterViewInit() {
    this.availableTranslationLocales = (this.languagesList as any).languagesForm.controls['availableTranslationLocales'].value;
    this.availableTranslationLocalesField.patchValue(this.availableTranslations);
  }

  private get availableTranslations(): string {
    return this.availableTranslationLocales.map((o) => o.checked ? o.code : '').filter((l) => l !== '').join(',');
  }

  get emailField(): FormControl {
    return this.inviteUserForm.get('email') as FormControl;
  }

  get roleField(): FormControl {
    return this.inviteUserForm.get('role') as FormControl;
  }

  get availableTranslationLocalesField(): FormControl {
    return this.inviteUserForm.get('availableTranslationLocales') as FormControl;
  }

  onUserInviteClick(): void {
    this.generateInvitationLink();
  }

  private generateInvitationLink(): any {
    const targetEmail = this.inviteUserForm.get('email').value;
    const req: InviteUserModel = {
      targetEmail,
      projectUuid: this.data.projectUuid,
      role: this.roleField.value,
      availableTranslationLocales: this.availableTranslations,
    };
    return this.shareProjectService.addUser(req)
      .pipe(
        catchError((error: ErrorModel) => {
          console.log('___ error', error); // todo
          return error.message;
        }),
      )
      .subscribe((res: string) => {
        console.log('___ res', res);
      });
  }

  public onUserModelChange(userRole: UserRoleInterface): void {
    this.userRoles.forEach((role: UserRoleInterface) => {
      role.active = false;
    });
    userRole.active = true;
    this.roleField.patchValue(userRole.value);
  }

  public onListChangeEventEmit(value: any): void {
    this.availableTranslationLocalesField.patchValue(this.availableTranslations);
  }
}

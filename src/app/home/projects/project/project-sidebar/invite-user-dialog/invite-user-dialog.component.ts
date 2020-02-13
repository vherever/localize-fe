import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { catchError } from 'rxjs/operators';
// app imports
import { ShareProjectService } from '../../../../../core/services/api-interaction/share-project.service';
import { InviteUserModel } from '../../../../../core/models/invite-user.model';
import { ErrorModel } from '../../../../../core/models/error.model';

@Component({
  templateUrl: 'invite-user-dialog.component.html',
  styleUrls: ['invite-user-dialog.component.scss'],
})
export class InviteUserDialogComponent implements OnInit {
  inviteUserGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private shareProjectService: ShareProjectService,
    @Inject(MAT_DIALOG_DATA) public data: { projectId: number },
  ) {
  }

  ngOnInit() {
    this.inviteUserGroup = this.fb.group({
      email: ['', [Validators.required]],
    });
  }

  get emailField(): FormControl {
    return this.inviteUserGroup.get('email') as FormControl;
  }

  onUserInviteClick(): void {
    this.generateInvitationLink();
  }

  private generateInvitationLink(): any {
    const targetEmail = this.inviteUserGroup.get('email').value;
    const req: InviteUserModel = {
      targetEmail,
      projectId: this.data.projectId,
      role: 'developer',
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
}

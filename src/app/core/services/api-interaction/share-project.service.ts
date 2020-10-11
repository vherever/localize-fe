import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// app imports
import { InviteUserModel } from '../../models/invite-user.model';
import { ShareProjectApiService } from '../api/share-project-api.service';
import { ManagePermissionsModel } from '../../models/manage-permissions.model';
import { delay } from 'rxjs/operators';

const delay_ms = 2000;

@Injectable()
export class ShareProjectService {
  constructor(
    private shareProjectApiService: ShareProjectApiService,
  ) {
  }

  addUser(req: InviteUserModel): Observable<string> {
    return this.shareProjectApiService.add(req);
  }

  removeUser(req: InviteUserModel): Observable<any> {
    return this.shareProjectApiService.remove(req);
  }

  managePermissions(req: ManagePermissionsModel): Observable<any> {
    return this.shareProjectApiService.managePermissions(req)
      .pipe(
        delay(delay_ms),
      );
  }
}

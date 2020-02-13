import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InviteUserModel } from '../../models/invite-user.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ManagePermissionsModel } from '../../models/manage-permissions.model';

@Injectable()
export class ShareProjectApiService {
  constructor(
    private http: HttpClient,
  ) {
  }

  add(req: InviteUserModel): Observable<string> {
    return this.http.post(environment.apiUrl + '/invite/add', req, { responseType: 'text' }) as Observable<string>;
  }

  remove(req: InviteUserModel): Observable<any> {
    return this.http.post(environment.apiUrl + '/invite/remove', req) as Observable<any>;
  }

  managePermissions(req: ManagePermissionsModel): Observable<any> {
    return this.http.put(environment.apiUrl + '/invite/permissions', req) as Observable<any>;
  }
}

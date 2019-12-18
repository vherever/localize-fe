import { Component, Input, OnInit } from '@angular/core';
import { CacheService } from '@ngx-cache/core';
// app imports
import { UserModel } from '../../../core/models/user.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-user-info',
  templateUrl: 'user-info.component.html',
  styleUrls: ['user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() userData: UserModel;
  uploadsEndpoint: string;

  constructor(
    private cacheService: CacheService,
  ) {
  }

  ngOnInit() {
    this.uploadsEndpoint = `${environment.apiUrl}/uploads`;
  }

  onAvatarUpdated(fileName: string): void {
    this.userData.avatar = null;
    setTimeout(() => {
      this.userData.avatar = fileName;
      this.cacheService.set('userData', this.userData);
    }, 1);
  }
}

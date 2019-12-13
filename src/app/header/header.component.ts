import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from '@ngx-cache/core';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
// app imports
import { AuthService } from '../core/api/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(
    private authService: AuthService,
    private cacheService: CacheService,
    private pubSubService: NgxPubSubService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.pubSubService.subscribe('isAuthenticated', (state: boolean) => {
      this.isAuthenticated = state;
      if (state) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  onLogOutClick(): void {
    this.cacheService.set('userData', null);
    this.authService.onLogOut();
    this.pubSubService.publishEvent('isAuthenticated', false);
  }

  onAccountSettingsClick(): void {
    this.pubSubService.publishEvent('accountSettingsDialogOpened', true);
  }
}

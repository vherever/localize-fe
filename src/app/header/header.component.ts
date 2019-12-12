import { Component, OnInit } from '@angular/core';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { Router } from '@angular/router';
// app imports
import { AuthService } from '../core/api/services/auth.service';
import { CacheService } from '@ngx-cache/core';

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
}

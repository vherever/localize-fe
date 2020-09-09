import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
// app imports
import { AuthService } from '../core/services/api/auth.service';
import { UserModel } from '../core/models/user.model';
import { AppStateModel } from '../store/models/app-state.model';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private isAuthenticated: boolean;
  private userData$: Observable<UserModel>;

  constructor(
    private authService: AuthService,
    private pubSubService: NgxPubSubService,
    private router: Router,
    private store: Store<AppStateModel>,
  ) {
  }

  ngOnInit() {
    this.userData$ = this.store.select((store: AppStateModel) => store.userData.user);

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

  ngOnDestroy() {
  }

  onLogOutClick(): void {
    this.authService.onLogOut();
    this.pubSubService.publishEvent('isAuthenticated', false);
  }
}

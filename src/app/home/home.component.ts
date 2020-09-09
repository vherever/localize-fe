import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// app imports
import { AuthService } from '../core/services/api/auth.service';
import { LocalesHelper } from '../core/helpers/locales-helper';
import { AppStateModel } from '../store/models/app-state.model';
import { LoadUserAction } from '../store/actions/user.actions';
import { LoadLocalesAction } from '../store/actions/locales.actions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent extends LocalesHelper implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private store: Store<AppStateModel>,
  ) {
    super();
  }

  ngOnInit() {
    const token = this.authService.decodeToken();
    if (token) {
      this.store.dispatch(new LoadUserAction(token.uuid));
      this.store.dispatch(new LoadLocalesAction());
    }
  }

  ngOnDestroy() {
  }
}

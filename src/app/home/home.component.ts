import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// app imports
import { AuthService } from '../core/services/api/auth.service';
import { LanguagesHelper } from '../core/helpers/languages-helper';
import { AppStateModel } from '../store/models/app-state.model';
import { LoadUserAction } from '../store/actions/user.actions';
import { LoadLanguagesAction } from '../store/actions/languages.actions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent extends LanguagesHelper implements OnInit, OnDestroy {
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
      this.store.dispatch(new LoadLanguagesAction());
    }
  }

  ngOnDestroy() {
  }
}

import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { UserModel } from '../../core/models/user.model';
import { UPLOADS_ENDPOINT } from '../../core/app-constants';
import { AppStateModel } from '../../store/models/app-state.model';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  @Output() logOutClickedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  private readonly uploadsEndpoint: string = UPLOADS_ENDPOINT;
  private userData: UserModel;
  private userData$: Observable<UserModel>;
  private avatar: string;
  private avatar$: Observable<string>;

  constructor(
    private store: Store<AppStateModel>,
  ) {
  }

  ngOnInit() {
    this.userData$ = this.store.select((store: AppStateModel) => store.userData.user);
    this.userData$
      .pipe(untilComponentDestroyed(this))
      .subscribe((userData: UserModel) => {
        this.userData = userData;
        this.avatar = userData.avatar;
      });

    this.avatar$ = this.store.select((store: AppStateModel) => store.userData.avatar);
    this.avatar$
      .pipe(untilComponentDestroyed(this))
      .subscribe((avatar: string) => {
        this.avatar = avatar;
      });
  }

  ngOnDestroy() {
  }

  onLogOutClick(): void {
    this.logOutClickedEvent.emit(true);
  }
}

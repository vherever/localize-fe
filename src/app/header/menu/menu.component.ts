import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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

  public readonly uploadsEndpoint: string = UPLOADS_ENDPOINT;

  public menuOpened: boolean;
  public userData: UserModel;
  public userData$: Observable<UserModel>;
  public avatar$: Observable<string>;

  constructor(
    private store: Store<AppStateModel>,
  ) {
  }

  ngOnInit() {
    this.userData$ = this.store.select((store: AppStateModel) => store.userData.user);
    this.avatar$ = this.store.select((store: AppStateModel) => store.userData.avatar);
  }

  ngOnDestroy() {
  }

  onLogOutClick(): void {
    this.menuOpened = false;
    this.logOutClickedEvent.emit(true);
  }

  openMenuClick(): void {
    this.menuOpened = !this.menuOpened;
  }

  onClickedOutside(): void {
    this.menuOpened = false;
  }
}

import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
// app imports
import { AppStateModel } from '../store/models/app-state.model';

@Component({
  selector: 'app-app-route-root',
  templateUrl: './app-route-root.component.html',
  styleUrls: ['app-route-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppRouteRootComponent implements AfterViewInit {
  private loadingProjects$: Observable<boolean>;
  private loadingUser$: Observable<boolean>;
  private loadingProject$: Observable<boolean>;

  constructor(
    private store: Store<AppStateModel>,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngAfterViewInit() {
    this.loadingProjects$ = this.store.select((store: AppStateModel) => store.projects.loading);
    this.loadingProject$ = this.store.select((store: AppStateModel) => store.project.loading);
    this.loadingUser$ = this.store.select((store: AppStateModel) => store.userData.loading);
    this.cdr.detectChanges();
  }
}

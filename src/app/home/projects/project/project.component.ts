import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { ProjectModel } from '../../../core/models/project.model';
import { AppStateModel } from '../../../store/models/app-state.model';
import { CancelProjectLoadingAction, ClearProjectAction } from '../../../store/actions/project.actions';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';

@Component({
  templateUrl: 'project.component.html',
  styleUrls: ['project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectComponent implements OnInit, OnDestroy {
  private projectId: string;
  public activeLocale: string;
  public projectData$: Observable<ProjectModel>;
  public projectLoading$: Observable<boolean>;
  public projectData: ProjectModel;

  public projectUpdating$: Observable<boolean>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppStateModel>,
    private pubSubService: NgxPubSubService,
  ) {
    this.route.params
      .pipe(untilComponentDestroyed(this))
      .subscribe((params) => {
        this.projectId = params['id'];
      });

    this.router.events
      .pipe(
        untilComponentDestroyed(this),
        filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd),
      )
      .subscribe(() => {
        setTimeout(() => {
          this.pubSubService.publishEvent('EVENT:LOAD_PROJECT_BY_ID', this.projectId);
        }, 1);
      });
  }

  ngOnInit() {
    this.projectLoading$ = this.store.select((store: AppStateModel) => store.project.loading);
    this.projectData$ = this.store
      .pipe(
        filter((store: AppStateModel) => {
          return !store.project.loading && store.project.data;
        }),
        first(),
        select((store: AppStateModel) => {
          this.projectData = store.project.data;
          return store.project.data;
        }),
      );

    this.projectUpdating$ = this.store.select((store: AppStateModel) => store.project.updating);
  }

  ngOnDestroy() {
    this.store.dispatch(new CancelProjectLoadingAction());
    this.store.dispatch(new ClearProjectAction());
  }

  onActiveLocaleEmit(activeLocale: string): void {
    this.activeLocale = activeLocale;
  }
}

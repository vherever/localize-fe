import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { ProjectModel } from '../../../core/models/project.model';
import { AppStateModel } from '../../../store/models/app-state.model';
import { CancelProjectLoadingAction, LoadProjectByIdAction } from '../../../store/actions/project.actions';

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

  constructor(
    private pubSubService: NgxPubSubService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppStateModel>,
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
          this.store.dispatch(new LoadProjectByIdAction(this.projectId));
        }, 1);
      });
  }

  ngOnInit() {
    this.projectLoading$ = this.store.select((store: AppStateModel) => store.project.loading);
    this.projectData$ = this.store.select((store: AppStateModel) => {
      this.projectData = store.project.data;
      return store.project.data;
    });

  }

  ngOnDestroy() {
    this.store.dispatch(new CancelProjectLoadingAction());
  }

  onActiveLocaleEmit(activeLocale: string): void {
    console.log('activeLocale', activeLocale);
    this.activeLocale = activeLocale;
  }
}

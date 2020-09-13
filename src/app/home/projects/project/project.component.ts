import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
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
export class ProjectComponent implements OnDestroy {
  private projectId: string;
  private activeLocale: string;

  private projectData$: Observable<ProjectModel>;
  private projectLoading$: Observable<boolean>;

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

    // this.router.events
    //   .pipe(
    //     untilComponentDestroyed(this),
    //     filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd),
    //   )
    //   .subscribe((event) => {
    //     if (
    //       event.id === 1 &&
    //       event.url === event.urlAfterRedirects
    //     ) {
    //       // if page refreshed
    //       this.projectService.getProjectById(this.projectId)
    //         .pipe(untilComponentDestroyed(this))
    //         .subscribe((project: ProjectModel) => {
    //           this.projectData = project;
    //           // @ts-ignore
    //           this.appDataGlobalStorageService.currentProject = project;
    //         });
    //     } else {
    //       this.appDataGlobalStorageService.currentProject
    //         .pipe(untilComponentDestroyed(this))
    //         .subscribe((project: ProjectModel) => {
    //           this.projectData = project;
    //         });
    //     }
    //   });
  }

  ngOnInit() {
    this.projectLoading$ = this.store.select((store: AppStateModel) => store.project.loading);
    this.projectData$ = this.store.select((store: AppStateModel) => store.project.data);

  }

  ngOnDestroy() {
    this.store.dispatch(new CancelProjectLoadingAction());
  }

  onActiveLocaleEmit(activeLocale: string): void {
    console.log('activeLocale', activeLocale);
    this.activeLocale = activeLocale;
  }
}

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { ProjectModel } from '../../../core/models/project.model';
import { AppStateModel } from '../../../store/models/app-state.model';
import { CancelProjectLoadingAction, LoadProjectByIdAction } from '../../../store/actions/project.actions';
import { LoadLocalesAction } from '../../../store/actions/locales.actions';

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
    this.projectData$ = this.store
      .pipe(
        filter((t) => {
          return !t.project.loading && t.project.data;
        }),
        first(),
        select((store: AppStateModel) => {
          if (store.project) {
            this.store.dispatch(new LoadLocalesAction(this.prepareLocales(store.project.data)));
          }
          this.projectData = store.project.data;
          return store.project.data;
        }),
      );

    this.projectUpdating$ = this.store.select((store: AppStateModel) => store.project.updating);
  }

  ngOnDestroy() {
    this.store.dispatch(new CancelProjectLoadingAction());
  }

  onActiveLocaleEmit(activeLocale: string): void {
    this.activeLocale = activeLocale;
  }

  private prepareLocales(projectData: ProjectModel): string[] {
    let result: string[];
    const translationsLocales: string = projectData.translationsLocales ? projectData.translationsLocales : '';
    if (projectData.role === 'administrator') {
      result = `${projectData.defaultLocale},${translationsLocales}`.split(',');
    } else {
      result = `${projectData.availableTranslationLocales}`.split(',');
    }
    return result.filter((val: string) => val !== '');
  }
}

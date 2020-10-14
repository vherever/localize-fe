import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
// app imports
import { AppStateModel } from '../store/models/app-state.model';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { LoadProjectByIdAction } from '../store/actions/project.actions';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { ProjectModel } from '../core/models/project.model';
import { LoadLocalesAction } from '../store/actions/locales.actions';
import { filter, first, skip } from 'rxjs/operators';

@Component({
  selector: 'app-app-route-root',
  templateUrl: './app-route-root.component.html',
  styleUrls: ['app-route-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppRouteRootComponent implements AfterViewInit, OnDestroy {
  private loadingProjects$: Observable<boolean>;
  private loadingUser$: Observable<boolean>;
  private loadingProject$: Observable<boolean>;

  private projectData$: Observable<any>;

  constructor(
    private store: Store<AppStateModel>,
    private cdr: ChangeDetectorRef,
    private pubSubService: NgxPubSubService,
  ) {
  }

  ngAfterViewInit() {
    this.loadingProjects$ = this.store.select((store: AppStateModel) => store.projects.loading);
    this.loadingProject$ = this.store.select((store: AppStateModel) => store.project.loading);
    this.loadingUser$ = this.store.select((store: AppStateModel) => store.userData.loading);

    this.projectData$ = this.store
      .pipe(
        filter((t) => {
          return !t.project.loading && t.project.data;
        }),
        skip(1),
        first(),
        select((store: AppStateModel) => {
          if (store.project) {
            this.store.dispatch(new LoadLocalesAction(this.prepareLocales(store.project.data)));
          }
        }),
      );

    this.pubSubService
      .subscribe('EVENT:LOAD_PROJECT_BY_ID', (projectId: string) => {
        this.store.dispatch(new LoadProjectByIdAction(projectId, true));
        this.projectData$
          .pipe(untilComponentDestroyed(this))
          .subscribe();
      });

    this.cdr.detectChanges();
  }

  private prepareLocales(projectData: ProjectModel): any[] {
    let result: string[];
    const translationsLocales: string = projectData.translationsLocales ? projectData.translationsLocales : '';
    if (projectData.role === 'administrator') {
      result = `${projectData.defaultLocale},${translationsLocales}`.split(',');
    } else {
      result = `${projectData.availableTranslationLocales}`.split(',');
    }

    return this.prepareAvailableTranslations(
      projectData.translationsLocales ? projectData.defaultLocale + ',' + projectData.translationsLocales : projectData.defaultLocale,
      result,
    );
  }

  private prepareAvailableTranslations(projectLocales: string, availableTranslations: string[]) {
    const result: any[] = [];
    projectLocales.split(',').forEach((loc1: string) => {
      result.push({ code: loc1, editable: false });
      const d = result.find((loc) => loc.code === loc1);
      availableTranslations.forEach((loc2: string) => {
        if (loc1 === loc2) {
          d.editable = true;
        }
      });
    });

    return result;
  }

  ngOnDestroy() {}
}

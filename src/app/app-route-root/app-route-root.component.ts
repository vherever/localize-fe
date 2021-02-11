import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
// app imports
import { AppStateModel } from '../store/models/app-state.model';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { LoadProjectByIdAction } from '../store/actions/project.actions';
import { LoadLocalesAction } from '../store/actions/locales.actions';
import { LoadDefaultLocaleAction } from '../store/actions/locale.actions';
import { LocaleHelper } from '../core/helpers/locale-helper';
import { LoadTagsAction } from '../store/actions/tag.actions';

@Component({
  selector: 'app-app-route-root',
  templateUrl: './app-route-root.component.html',
  styleUrls: ['app-route-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppRouteRootComponent implements AfterViewInit, OnDestroy {
  public loadingProjects$: Observable<boolean>;
  public loadingUser$: Observable<boolean>;
  public loadingProject$: Observable<boolean>;

  private languagesData$: Observable<any>;

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

    this.languagesData$ = this.store.select((store: AppStateModel) => store.languagesData.data);

    combineLatest(
      this.store.select((store: AppStateModel) => store.project.data),
      this.store.select((store: AppStateModel) => store.languagesData.data),
    ).subscribe((data: any) => {
      console.log('data', data);
      if (data[0] && data[1]) {
        const locale = LocaleHelper.getDefaultLocale(data[0], data[1]);
        this.store.dispatch(new LoadDefaultLocaleAction(locale));
        this.store.dispatch(new LoadLocalesAction(
          LocaleHelper.prepareLocales(
            data[0].translationsLocales,
            data[0].availableTranslationLocales,
            data[1],
          )));
      }
    });

    this.pubSubService
      .subscribe('EVENT:LOAD_PROJECT_BY_ID', (projectId: string) => {
        this.store.dispatch(new LoadProjectByIdAction(projectId));
        this.store.dispatch(new LoadTagsAction(projectId));
      });

    // this.pubSubService
    //   .subscribe('EVENT:LOAD_PROJECT_TAGS', (projectUuid: string) => {
    //     this.store.dispatch(new LoadTagsAction(projectUuid));
    //   });
    this.cdr.detectChanges();
  }

  ngOnDestroy() {}
}

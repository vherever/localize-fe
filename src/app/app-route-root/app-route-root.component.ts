import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
// app imports
import { AppStateModel } from '../store/models/app-state.model';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { LoadProjectByIdAction } from '../store/actions/project.actions';
import { ProjectModel } from '../core/models/project.model';
import { LoadLocalesAction } from '../store/actions/locales.actions';
import { LoadDefaultLocaleAction } from '../store/actions/locale.actions';
import { LocaleHelper } from '../core/helpers/locale-helper';

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
      if (data[0] && data[1]) {
        const locale = LocaleHelper.getDefaultLocale(data[0], data[1]);
        this.store.dispatch(new LoadDefaultLocaleAction(locale));
        this.store.dispatch(new LoadLocalesAction(
          this.prepareLocales(data[0],
            data[1],
          )));
      }
    });

    this.pubSubService
      .subscribe('EVENT:LOAD_PROJECT_BY_ID', (projectId: string) => {
        this.store.dispatch(new LoadProjectByIdAction(projectId, true));
      });

    this.cdr.detectChanges();
  }

  private prepareLocales(projectData: ProjectModel, languagesData: any): any[] {
    let result: string[];
    const translationsLocales: string = projectData.translationsLocales ? projectData.translationsLocales : '';
    if (projectData.role === 'ADMINISTRATOR') {
      result = translationsLocales.split(',');
    } else {
      result = `${projectData.availableTranslationLocales}`.split(',');
    }

    return this.prepareAvailableTranslations(
      projectData.translationsLocales ? projectData.translationsLocales : '',
      result,
      languagesData,
    );
  }

  private prepareAvailableTranslations(projectLocales: string, availableTranslations: string[], languagesData: any) {
    const result: any[] = [];
    projectLocales.split(',').forEach((loc1: string) => {
      let found: any = languagesData.find((l) => l.keyCode === loc1);
      found = { ...found, editable: false };
      result.push(found);
      const d = result.find((loc) => loc.keyCode === loc1);
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

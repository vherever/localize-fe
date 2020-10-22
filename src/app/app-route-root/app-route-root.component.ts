import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
// app imports
import { AppStateModel } from '../store/models/app-state.model';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { LoadProjectByIdAction } from '../store/actions/project.actions';
import { ProjectModel } from '../core/models/project.model';
import { LoadLocalesAction } from '../store/actions/locales.actions';
import { LanguagesHelper } from '../core/helpers/languages-helper';

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
        const languagesData = LanguagesHelper.formatData(data[1]);
        const languagesDataFormatted = LanguagesHelper.getResult('', languagesData);
        this.store.dispatch(new LoadLocalesAction(
          this.prepareLocales(data[0],
            languagesDataFormatted,
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
      result = `${projectData.defaultLocale},${translationsLocales}`.split(',');
    } else {
      result = `${projectData.availableTranslationLocales}`.split(',');
    }

    return this.prepareAvailableTranslations(
      projectData.translationsLocales ? projectData.defaultLocale + ',' + projectData.translationsLocales : projectData.defaultLocale,
      result,
      languagesData,
    );
  }

  private prepareAvailableTranslations(projectLocales: string, availableTranslations: string[], languagesData: any) {
    const result: any[] = [];
    projectLocales.split(',').forEach((loc1: string) => {
      const found: any = languagesData.find((l) => l.keyCode === loc1);
      result.push({ code: loc1, name: found.value, flag: found.emoji || '', editable: false, name1: found.name1 || '', name2: found.name2 || '' });
      const d = result.find((loc) => loc.code === loc1);
      availableTranslations.forEach((loc2: string) => {
        if (loc1 === loc2) {
          d.editable = true;
        }
      });
    });

    // console.log('result', result);
    return result;
  }

  ngOnDestroy() {}
}

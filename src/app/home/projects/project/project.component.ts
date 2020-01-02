import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { AppDataGlobalStorageService } from '../../../core/services/app-data-global-storage.service';
import { ProjectModel } from '../../../core/models/project.model';
import { ProjectService } from '../../../core/services/api-interaction/project.service';

@Component({
  templateUrl: 'project.component.html',
  styleUrls: ['project.component.scss'],
})
export class ProjectComponent implements OnDestroy {
  projectId: number;
  projectData: ProjectModel;
  activeLocale: string;

  constructor(
    private pubSubService: NgxPubSubService,
    private router: Router,
    private appDataGlobalStorageService: AppDataGlobalStorageService,
    private route: ActivatedRoute,
    private projectService: ProjectService,
  ) {
    this.route.params
      .pipe(untilComponentDestroyed(this))
      .subscribe((params) => {
        this.projectId = +params['id'];
      });

    this.router.events
      .pipe(
        untilComponentDestroyed(this),
        filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd),
      )
      .subscribe((event) => {
        if (
          event.id === 1 &&
          event.url === event.urlAfterRedirects
        ) {
          // if page refreshed
          this.projectService.getProjectById(this.projectId)
            .pipe(untilComponentDestroyed(this))
            .subscribe((project: ProjectModel) => {
              this.projectData = project;
              // @ts-ignore
              this.appDataGlobalStorageService.currentProject = project;
            });
        } else {
          this.appDataGlobalStorageService.currentProject
            .pipe(untilComponentDestroyed(this))
            .subscribe((res: ProjectModel) => {
              this.projectData = res;
            });
        }
      });

  }

  ngOnDestroy() {
  }

  onActiveLocaleEmit(activeLocale: string): void {
    this.activeLocale = activeLocale;
  }
}

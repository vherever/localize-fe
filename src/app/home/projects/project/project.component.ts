import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// app imports
import { AppDataGlobalStorageService } from '../../../core/services/app-data-global-storage.service';
import { ProjectModel } from '../../../core/models/project.model';
import { ProjectService } from '../../../core/services/api-interaction/project.service';

@Component({
  templateUrl: 'project.component.html',
})
export class ProjectComponent implements OnDestroy {
  projectId: number;
  projectData: ProjectModel;

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
            });
        } else {
          this.appDataGlobalStorageService.userProjects
            .pipe(untilComponentDestroyed(this))
            .subscribe((projects: {owned: ProjectModel[], shared: ProjectModel[]}) => {
              this.projectData = [...projects.owned, ...projects.shared]
                .find((p: ProjectModel) => p.id === this.projectId);
            });
        }
      });

  }

  ngOnDestroy() {
  }
}

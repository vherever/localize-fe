import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ProjectModel } from '../../../../core/models/project.model';

@Component({
  selector: 'app-project-sidebar',
  templateUrl: 'project-sidebar.component.html',
  styleUrls: ['project-sidebar.component.scss'],
})
export class ProjectSidebarComponent implements OnChanges {
  @Input() projectData: ProjectModel;
  @Output() activeLocaleEmit: EventEmitter<string> = new EventEmitter();

  projectLocales: string[];
  activeLocale: string;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.projectData.currentValue) {
      this.projectLocales = this.projectData.translationsLocales.split(',');
      this.activeLocale = this.projectData.defaultLocale;
      this.activeLocaleEmit.emit(this.activeLocale);
    }
  }

  onLocaleClick(locale: string): void {
    this.activeLocale = locale;
    this.activeLocaleEmit.emit(locale);
  }
}

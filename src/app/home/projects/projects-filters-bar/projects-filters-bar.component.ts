import { Component, EventEmitter, Input, Output } from '@angular/core';
// app imports
import { FilterService } from '../../../core/shared/filter/filter.service';

@Component({
  selector: 'app-projects-filters-bar',
  templateUrl: 'projects-filters-bar.component.html',
  styleUrls: ['projects-filters-bar.component.scss'],
})
export class ProjectsFiltersBarComponent {
  @Input() projectsAllCount: number;
  @Input() yourProjectsCount: number;
  @Input() sharedProjectsCount: number;

  @Output() sortKeySelected2: EventEmitter<string> = new EventEmitter();
  @Output() projectsListToggleEvent: EventEmitter<string> = new EventEmitter();

  constructor(
    public filterService: FilterService,
  ) {
  }

  onNotifyFilter(value: string): void {
    this.filterService.onNotifyFilter(value);
  }

  onSortKeySelected(value: string): void {
    this.sortKeySelected2.emit(value);
  }

  onProjectsListToggleEvent(value: string): void {
    this.projectsListToggleEvent.emit(value);
  }
}

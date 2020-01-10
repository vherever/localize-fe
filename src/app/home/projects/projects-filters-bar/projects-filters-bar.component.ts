import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
// app imports
import { FilterService } from '../../../core/shared/filter/filter.service';
import { UserConfigService } from '../../../core/services/user-config/user-config.service';

@Component({
  selector: 'app-projects-filters-bar',
  templateUrl: 'projects-filters-bar.component.html',
  styleUrls: ['projects-filters-bar.component.scss'],
})
export class ProjectsFiltersBarComponent implements OnInit, OnChanges {
  @Input() projectsAllCount: number;
  @Input() yourProjectsCount: number;
  @Input() sharedProjectsCount: number;

  @Output() sortKeySelected2: EventEmitter<string> = new EventEmitter();
  @Output() projectsListToggleEvent: EventEmitter<string> = new EventEmitter();

  private tabKeys: string[] = [
    'all',
    'yours',
    'shared',
  ];

  activeTab: string;

  constructor(
    public filterService: FilterService,
    private userConfigService: UserConfigService,
  ) {
  }

  ngOnInit() {
    this.activeTab = this.userConfigService.getItem('projectsActiveTab');
    if (this.activeTab) {
      if (this.isConfigCorrect(this.activeTab)) {
        this.onProjectsListToggle(this.activeTab);
      } else {
        this.onProjectsListToggle('all');
        this.activeTab = 'all';
      }
    } else {
      this.onProjectsListToggle('all');
      this.activeTab = 'all';
    }
  }

  ngOnChanges() {
  }

  onSortKeySelected(value: string): void {
    this.sortKeySelected2.emit(value);
  }

  onNotifyFilter(value: string): void {
    this.filterService.onNotifyFilter(value);
  }

  onProjectsListToggle(value: string): void {
    this.userConfigService.setItem('projectsActiveTab', value);
    this.projectsListToggleEvent.emit(value);
  }

  private isConfigCorrect(key: string): boolean {
    return !!this.tabKeys.find((k) => k === key);
  }
}

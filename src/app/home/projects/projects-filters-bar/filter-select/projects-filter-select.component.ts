import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// app imports
import { ProjectsFilterSelectModel } from './projects-filter-select.model';
import { UserConfigService } from '../../../../core/services/user-config/user-config.service';

const menuData = [
  {
    id: 0,
    isActive: false,
    text: 'Last updated',
    sortKey: 'updated_desc',
    value: 'updated_desc',
  },
  {
    id: 1,
    isActive: false,
    text: 'Last created',
    sortKey: 'created_desc',
    value: 'created_desc',
  },
  {
    id: 2,
    isActive: false,
    text: 'Name',
    sortKey: 'title_asc',
    value: 'title_asc',
  },
  {
    id: 3,
    isActive: false,
    text: 'Oldest updated',
    sortKey: 'updated_asc',
    value: 'updated_asc',
  },
  {
    id: 4,
    isActive: false,
    text: 'Oldest created',
    sortKey: 'created_asc',
    value: 'created_asc',
  },
];

@Component({
  selector: 'app-projects-filter-select',
  templateUrl: 'projects-filter-select.component.html',
  styleUrls: [
    '../../../../core/shared/country-search-autocomplete/country-search-autocomplete.component.scss',
  ],
})
export class AppProjectsFilterSelectComponent implements OnInit {
  @Output() sortKeySelected: EventEmitter<string> = new EventEmitter<string>();

  private keysForSort: string[] = [
    'title_asc',
    'title_desc',
    'created_asc',
    'created_desc',
    'updated_asc',
    'updated_desc',
  ];

  public activeSortKey: string;

  public selectedSortKey: string;
  public selectData: ProjectsFilterSelectModel[];

  constructor(
    private userConfigService: UserConfigService,
  ) {
  }

  ngOnInit() {
    this.selectData = menuData;

    this.activeSortKey = this.userConfigService.getItem('projectsActiveSortKey');
    if (this.activeSortKey && this.isConfigCorrect(this.activeSortKey)) {
      this.onSortChange(this.activeSortKey);
    } else {
      this.activeSortKey = 'updated_desc';
      this.userConfigService.setItem('projectsActiveSortKey', this.activeSortKey);
      this.onSortChange(this.activeSortKey);
    }
  }

  onSortChange(sortKey: string): void {
    this.selectedSortKey = sortKey;
    if (sortKey) {
      this.userConfigService.setItem('projectsActiveSortKey', sortKey);
    }
    this.sortKeySelected.emit(sortKey);
  }

  private isConfigCorrect(key: string): boolean {
    return !!this.keysForSort.find((k) => k === key);
  }
}

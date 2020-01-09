import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProjectsFilterSelectModel } from './projects-filter-select.model';

@Component({
  selector: 'app-projects-filter-select',
  templateUrl: 'projects-filter-select.component.html',
})
export class AppProjectsFilterSelectComponent implements OnInit {
  @Output() sortKeySelected: EventEmitter<string> = new EventEmitter<string>();

  selectedId = 3;
  selectData: ProjectsFilterSelectModel[];

  constructor() {
  }

  ngOnInit() {
    this.selectData = [
      {
        id: 0,
        isActive: false,
        text: 'Last updated',
        sortKey: 'latest_activity_desc',
      },
      {
        id: 1,
        isActive: false,
        text: 'Last created',
        sortKey: 'created_desc',
      },
      {
        id: 2,
        isActive: false,
        text: 'Name',
        sortKey: 'name_asc',
      },
      {
        id: 3,
        isActive: false,
        text: 'Oldest updated',
        sortKey: 'latest_activity_asc',
      },
      {
        id: 4,
        isActive: false,
        text: 'Oldest created',
        sortKey: 'created_asc',
      },
    ];

    this.sortKeySelected.emit(this.selectData[this.selectedId].sortKey);
  }

  onSortChange(sortItem: ProjectsFilterSelectModel): void {
    this.sortKeySelected.emit(sortItem.sortKey);
  }
}

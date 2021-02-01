import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// app imports
import { UserConfigService } from '../../../../core/services/user-config/user-config.service';

@Component({
  selector: 'app-projects-lists-switcher',
  templateUrl: 'projects-lists-switcher.component.html',
})
export class ProjectsListsSwitcherComponent implements OnInit {
  @Input() projectsAllCount: number;
  @Input() yourProjectsCount: number;
  @Input() sharedProjectsCount: number;

  @Output() projectsListToggleEvent: EventEmitter<string> = new EventEmitter();

  private tabKeys: string[] = [
    'all',
    'yours',
    'shared',
  ];

  public activeTab: string;

  constructor(
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
    console.log('this.activeTab', this.activeTab);
  }

  onProjectsListToggle(value: string): void {
    this.activeTab = value;
    this.userConfigService.setItem('projectsActiveTab', value);
    this.projectsListToggleEvent.emit(value);
  }

  private isConfigCorrect(key: string): boolean {
    return !!this.tabKeys.find((k) => k === key);
  }
}

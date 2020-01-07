import { Component, EventEmitter, Input, Output } from '@angular/core';
// app imports
import { UserModel } from '../../core/models/user.model';
import { UPLOADS_ENDPOINT } from '../../core/app-constants';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss'],
})
export class MenuComponent {
  @Input() userData: UserModel;
  @Output() logOutClickedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  uploadsEndpoint: string;

  constructor() {
    this.uploadsEndpoint = UPLOADS_ENDPOINT;
  }

  onLogOutClick(): void {
    this.logOutClickedEvent.emit(true);
  }
}

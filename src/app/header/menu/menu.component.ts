import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserModel } from '../../core/models/user.model';

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
    this.uploadsEndpoint = `${environment.apiUrl}/uploads`;
  }

  onLogOutClick(): void {
    this.logOutClickedEvent.emit(true);
  }
}

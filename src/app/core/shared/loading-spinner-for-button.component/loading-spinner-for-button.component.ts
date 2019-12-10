import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner-for-button',
  templateUrl: 'loading-spinner-for-button.component.html',
  styleUrls: ['loading-spinner-for-button.component.scss'],
})
export class LoadingSpinnerForButtonComponent {
  @Input() isLoading: boolean;
  @Input() text: string;

  constructor() {
  }
}

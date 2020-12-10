import { Component } from '@angular/core';
import { ContentModalDialogService } from './content-modal-dialog.service';

@Component({
  templateUrl: 'content-modal-dialog.component.html',
  styleUrls: ['content-modal-dialog.component.scss'],
})
export class ContentModalDialogComponent {
  constructor(
    private contentModalDialogService?: ContentModalDialogService,
  ) {
  }
}

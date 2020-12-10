import { NgModule } from '@angular/core';
// app imports
import { ContentModalDialogComponent } from './content-modal-dialog.component';
import { ContentModalDialogService } from './content-modal-dialog.service';

@NgModule({
  imports: [
  ],
  declarations: [
    ContentModalDialogComponent,
  ],
  providers: [
    ContentModalDialogService,
  ],
})
export class ContentModalDialogModule {}

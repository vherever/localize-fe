import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
// app imports
import { PubSubEventsHandlerComponent } from './pub-sub-events-handler.component';
import { UserInfoDialogModule } from '../../../home/user-info-dialog/user-info-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    UserInfoDialogModule,
  ],
  providers: [
    NgxPubSubService,
  ],
  declarations: [PubSubEventsHandlerComponent],
  exports: [PubSubEventsHandlerComponent],
})
export class PubSubEventsHandlerModule {
}

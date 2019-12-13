import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
// app imports
import { PubSubEventsHandlerComponent } from './pub-sub-events-handler.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    NgxPubSubService,
  ],
  declarations: [PubSubEventsHandlerComponent],
  exports: [PubSubEventsHandlerComponent],
})
export class PubSubEventsHandlerModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
// app imports
import { EmailSentComponent } from './email-sent.component';
import { EmailSentRoutingModule } from './email-sent-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EmailSentRoutingModule,

    MatCardModule,
  ],
  declarations: [EmailSentComponent],
})
export class EmailSentModule {
}

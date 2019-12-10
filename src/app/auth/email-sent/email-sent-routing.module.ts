import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// app imports
import { EmailSentComponent } from './email-sent.component';

const routes: Routes = [
  {
    path: '',
    component: EmailSentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailSentRoutingModule {
}

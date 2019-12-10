import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatInputModule } from '@angular/material';
// app imports
import { ResetPasswordComponent } from './reset-password.component';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,

    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [ResetPasswordComponent],
})
export class ResetPasswordModule {
}

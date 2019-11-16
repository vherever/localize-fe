import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatCardModule, MatInputModule} from '@angular/material';
// app imports
import {ForgotPasswordComponent} from './forgot-password.component';
import {ForgotPasswordRoutingModule} from './forgot-password-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,

    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [ForgotPasswordComponent]
})
export class ForgotPasswordModule {}

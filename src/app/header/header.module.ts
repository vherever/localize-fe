import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
// app imports
import { HeaderComponent } from './header.component';
import { AuthService } from '../core/api/services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    MatToolbarModule,
    MatButtonModule,
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  providers: [AuthService],
})
export class HeaderModule {
}

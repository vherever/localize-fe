import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatDialogModule, MatIconModule, MatMenuModule, MatToolbarModule } from '@angular/material';
// app imports
import { HeaderComponent } from './header.component';
import { AuthService } from '../core/services/api/auth.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  providers: [AuthService],
})
export class HeaderModule {
}

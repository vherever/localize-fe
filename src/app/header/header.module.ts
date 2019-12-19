import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatDialogModule, MatIconModule, MatToolbarModule } from '@angular/material';
// app imports
import { HeaderComponent } from './header.component';
import { AuthService } from '../core/services/api/auth.service';
import { UserInfoDialogModule } from '../home/user-info-dialog/user-info-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  providers: [AuthService],
})
export class HeaderModule {
}

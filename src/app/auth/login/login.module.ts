import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// app imports
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginService } from '../../core/services/api-interaction/login.service';
import { LoginApiService } from '../../core/services/api/login-api.service';
import { LoadingSpinnerForButtonModule } from '../../core/shared/loading-spinner-for-button.component/loading-spinner-for-button.module';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,

    LoadingSpinnerForButtonModule,
  ],
  declarations: [LoginComponent],
  providers: [
    LoginService,
    LoginApiService,
  ],
})
export class LoginModule {
}

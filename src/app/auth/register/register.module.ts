import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { MatButtonModule, MatCardModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// app imports
import {RegisterComponent} from './register.component';
import {RegisterRoutingModule} from './register-routing.module';
import { RegisterService } from './register.service';
import { RegisterApiService } from '../../core/api/services/register-api.service';
import { LoadingSpinnerForButtonModule } from '../../core/shared/loading-spinner-for-button.module';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,

    LoadingSpinnerForButtonModule,
  ],
  declarations: [RegisterComponent],
  providers: [
    RegisterService,
    RegisterApiService,
  ],
})
export class RegisterModule {}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatCardModule, MatInputModule} from '@angular/material';
// app imports
import {RegisterComponent} from './register.component';
import {RegisterRoutingModule} from './register-routing.module';
import { RegisterService } from './register.service';
import { RegisterApiService } from '../../core/api/services/register-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [RegisterComponent],
  providers: [
    RegisterService,
    RegisterApiService,
  ],
})
export class RegisterModule {}

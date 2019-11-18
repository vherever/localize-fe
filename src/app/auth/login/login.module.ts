import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatCardModule, MatCheckboxModule, MatInputModule} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// app imports
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';
import { LoginService } from './login.service';
import { LoginApiService } from '../../core/api/services/login-api.service';

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
  ],
  declarations: [LoginComponent],
  providers: [
    LoginService,
    LoginApiService,
  ]
})
export class LoginModule {}

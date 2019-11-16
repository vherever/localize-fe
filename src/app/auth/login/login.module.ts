import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatCardModule, MatCheckboxModule, MatInputModule} from '@angular/material';
// app imports
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,

    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  declarations: [LoginComponent],
})
export class LoginModule {}

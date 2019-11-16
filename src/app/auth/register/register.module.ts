import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatCardModule, MatInputModule} from '@angular/material';
// app imports
import {RegisterComponent} from './register.component';
import {RegisterRoutingModule} from './register-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,

    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [RegisterComponent],
})
export class RegisterModule {}

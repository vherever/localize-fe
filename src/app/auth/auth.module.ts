import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// app imports
import {AuthComponent} from './auth.component';
import {AuthRoutingModule} from './auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
  ],
  declarations: [AuthComponent]
})
export class AuthModule {}

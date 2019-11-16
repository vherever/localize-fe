import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material';
// app imports
import {TokenExpiredComponent} from './token-expired.component';
import {TokenExpiredRoutingModule} from './token-expired-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TokenExpiredRoutingModule,

    MatCardModule,
  ],
  declarations: [TokenExpiredComponent],
})
export class TokenExpiredModule {}

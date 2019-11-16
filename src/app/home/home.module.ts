import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// app imports
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
  ],
  providers: [],
})
export class HomeModule {}

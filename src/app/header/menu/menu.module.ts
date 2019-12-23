import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatMenuModule, MatSlideToggleModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
// app imports
import { MenuComponent } from './menu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,

    MatMenuModule,
    MatSlideToggleModule,
  ],
  declarations: [MenuComponent],
  exports: [MenuComponent],
})
export class MenuModule {
}

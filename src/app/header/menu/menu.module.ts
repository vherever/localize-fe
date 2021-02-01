import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';
// app imports
import { MenuComponent } from './menu.component';
import { LetDirective } from '../../core/directives/ng-let.directive';
import { AppSharedModule } from '../../core/shared/app-shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,

    MatMenuModule,
    MatSlideToggleModule,
    AppSharedModule,
  ],
  declarations: [MenuComponent, LetDirective],
  exports: [MenuComponent],
})
export class MenuModule {
}

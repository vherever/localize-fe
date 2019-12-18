import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// app imports
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserInfoModule } from './user-info/user-info.module';
import { RouterModule } from '@angular/router';
import { ProjectsModule } from './projects/projects.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    UserInfoModule,
    ProjectsModule,
  ],
  declarations: [DashboardComponent],
})
export class DashboardModule {
}

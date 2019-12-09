import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
// app imports
import {AppRouteRootComponent} from './app-route-root/app-route-root.component';
import { AuthGuardService } from './core/services/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: AppRouteRootComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/home/home.module#HomeModule',
        canActivate: [AuthGuardService],
      },
      {
        path: 'auth',
        loadChildren: 'app/auth/auth.module#AuthModule',
      },
      {
        path: '404',
        loadChildren: 'app/error404/error404.module#Error404Module',
      },
      {
        path: '**',
        redirectTo: '404',
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// app imports
import { AppRouteRootComponent } from './app-route-root/app-route-root.component';
import { AuthGuardService } from './core/services/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: AppRouteRootComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('app/home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuardService],
      },
      {
        path: 'auth',
        loadChildren: () => import('app/auth/auth.module').then(m => m.AuthModule),
      },
      {
        path: '404',
        loadChildren: () => import('app/error404/error404.module').then(m => m.Error404Module),
      },
      {
        path: '**',
        redirectTo: '404',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

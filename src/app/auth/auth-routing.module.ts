import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
// app imports
import {AuthComponent} from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
  },
  {
    path: 'register',
    loadChildren: './register/register.module#RegisterModule',
  },
  {
    path: 'forgot-password',
    loadChildren: './forgot-password/forgot-password.module#ForgotPasswordModule',
  },
  {
    path: 'email-sent',
    loadChildren: './email-sent/email-sent.module#EmailSentModule',
  },
  {
    path: 'reset-password',
    loadChildren: './reset-password/reset-password.module#ResetPasswordModule',
  },
  {
    path: 'token-expired',
    loadChildren: './token-expired/token-expired.module#TokenExpiredModule',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

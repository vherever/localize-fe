import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// app imports
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AppRouteRootComponent} from './app-route-root/app-route-root.component';
import {HeaderModule} from './header/header.module';
import { ErrorHandlerInterceptor } from './core/services/interceptors/error-handler-interceptor';
import { AuthGuardService } from './core/services/guards/auth-guard.service';
import { AuthService } from './core/api/services/auth.service';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    AppRouteRootComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: null
      }
    }),

    AppRoutingModule,
    HeaderModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true},
    AuthGuardService,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

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

@NgModule({
  declarations: [
    AppComponent,
    AppRouteRootComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    AppRoutingModule,
    HeaderModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

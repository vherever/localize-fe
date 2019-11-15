import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AppRouteRootComponent} from './app-route-root/app-route-root.component';

@NgModule({
  declarations: [
    AppComponent,
    AppRouteRootComponent,
  ],
  imports: [
    BrowserModule,

    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

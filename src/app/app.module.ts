import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// app imports
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AppRouteRootComponent} from './app-route-root/app-route-root.component';
import {HeaderModule} from './header/header.module';

@NgModule({
  declarations: [
    AppComponent,
    AppRouteRootComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,
    HeaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

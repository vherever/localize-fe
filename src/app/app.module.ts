import { BrowserModule, TransferState } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { CACHE, CacheModule } from '@ngx-cache/core';
import { NgxPubSubModule } from '@pscoped/ngx-pub-sub';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MAT_RIPPLE_GLOBAL_OPTIONS, MatProgressBarModule } from '@angular/material';
import { BrowserCacheModule, MemoryCacheService } from '@ngx-cache/platform-browser';
// app imports
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppRouteRootComponent } from './app-route-root/app-route-root.component';
import { HeaderModule } from './header/header.module';
import { ErrorHandlerInterceptor } from './core/services/interceptors/error-handler-interceptor';
import { AuthGuardService } from './core/services/guards/auth-guard.service';
import { AuthService } from './core/services/api/auth.service';
import { TokenInterceptor } from './core/services/interceptors/token-interceptor';
import { AppRouteRootModule } from './app-route-root/app-route-root.module';
import { PubSubEventsHandlerModule } from './core/shared/pub-sub-events-handler/pub-sub-events-handler.module';
import { environment } from '../environments/environment';
import { ProjectsReducer } from './store/reducers/projects.reducer';
import { UserReducer } from './store/reducers/user.reducer';
import { LocalesReducer } from './store/reducers/locales.reducer';
import { ProjectReducer } from './store/reducers/project.reducer';

@NgModule({
  declarations: [
    AppComponent,
    AppRouteRootComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRouteRootModule,
    NgxPubSubModule,
    CacheModule.forRoot(),
    BrowserCacheModule.forRoot([
      {
        provide: CACHE,
        useClass: MemoryCacheService, // or, LocalStorageCacheService
      },
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: null,
      },
    }),

    AppRoutingModule,
    PubSubEventsHandlerModule,
    HeaderModule,
    StoreModule.forRoot({
      projects: ProjectsReducer,
      project: ProjectReducer,
      userData: UserReducer,
      localesData: LocalesReducer,
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    MatProgressBarModule,
  ],
  providers: [
    // ProjectService,
    // ProjectApiService,
    TransferState,
    AuthGuardService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: MAT_RIPPLE_GLOBAL_OPTIONS,
      useValue: { disabled: true },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

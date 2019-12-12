import { BrowserModule, TransferState } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
// app imports
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppRouteRootComponent } from './app-route-root/app-route-root.component';
import { HeaderModule } from './header/header.module';
import { ErrorHandlerInterceptor } from './core/services/interceptors/error-handler-interceptor';
import { AuthGuardService } from './core/services/guards/auth-guard.service';
import { AuthService } from './core/api/services/auth.service';
import { TokenInterceptor } from './core/services/interceptors/token-interceptor';
import { CACHE, CacheLoader, CacheModule, CacheStaticLoader } from '@ngx-cache/core';
import { BrowserCacheModule, MemoryCacheService } from '@ngx-cache/platform-browser';
import { AppRouteRootModule } from './app-route-root/app-route-root.module';
import { NgxPubSubModule } from '@pscoped/ngx-pub-sub';

export function cacheFactory(): CacheLoader {
  return new CacheStaticLoader({
    key: 'NGX_CACHE',
    lifeSpan: {
      expiry: Number.MAX_VALUE,
      TTL: Number.MAX_VALUE,
    },
  });
}

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
    HeaderModule,
  ],
  providers: [
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

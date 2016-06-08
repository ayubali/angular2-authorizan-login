import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {AuthConfig, AuthHttp} from "angular2-jwt/angular2-jwt";
import {provide} from "angular2/core";

bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS,
  provide(AuthHttp, {
  useFactory: (http) => {
    return new AuthHttp(new AuthConfig({
      headerPrefix: '',
      tokenName: 'auth_key',
      tokenGetter: (() => window.localStorage.getItem('auth_key')), // 'window.localStorage.getItem()',
      globalHeaders: [{'Content-Type': 'application/json'}],
      noJwtError: true,
      noTokenScheme: true
    }), http);
  },
  deps: [Http]
})]);

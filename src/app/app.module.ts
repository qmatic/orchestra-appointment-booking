// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// NGRX Store
import { StoreModule, Store, ActionReducer, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Translations
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../i18n/TranslationsLoaderFactory';

// Store setup
import { reducers } from '../store/reducers';
import { effects } from '../store/effects';

// Routes
import { appRoutes } from './../routes/app-routes';

// Modules
import { SharedComponentsModule } from '../components/shared-components.module';

// Services
import { SPService } from './../services/rest/sp.service';
import { storeServices } from '../store';

// Components
import { AppComponent } from './app.component';

// Env
import { environment } from '../environments/environment';

// Actions
import { UserDispatchers, SystemInfoDispatchers } from '../store';
import { FetchSystemInfo } from './../store/actions/system-info.actions';
import { FetchUserInfo } from '../store/actions/user.actions';

// Console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = environment.production
  ? []
  : [debug];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedComponentsModule,
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [SPService, TranslateService, ...storeServices],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    private translate: TranslateService,
    private userDispatchers: UserDispatchers,
    private systemInfoDispatchers: SystemInfoDispatchers
  ) {
    // No Suffix for english language file (staffBookingMessages.properties)
    this.translate.setDefaultLang('staffBookingMessages');
    this.userDispatchers.fetchUserInfo();
    this.systemInfoDispatchers.fetchSystemInfo();
  }
}

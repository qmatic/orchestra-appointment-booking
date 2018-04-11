import { LicenseAuthGuard } from './../routes/license-auth-guard';
import { LicenseDispatchers } from './../store/services/license.dispatchers';
// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// Toastr
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';

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


// Services
import { SPService } from './../services/rest/sp.service';
import { ToastService } from './../services/util/toast.service';
import { storeServices, BranchDispatchers, ServiceDispatchers } from '../store';

// Components
import { AppComponent } from './app.component';
import { QmPageFooterComponent } from './components/presentational/qm-page-footer/qm-page-footer.component';
import { QmButtonComponent } from './components/presentational/qm-button/qm-button.component';
import { QmActionButtonComponent } from './components/presentational/qm-action-button/qm-action-button.component';

// Containers
import { QmPageHeaderComponent } from './components/containers/qm-page-header/qm-page-header.component';
import { QmListComponent } from './components/containers/qm-list/qm-list.component';
import { QmListItemComponent } from './components/containers/qm-list-item/qm-list-item.component';
import { QmListSelectItemComponent } from './components/containers/qm-select-item/qm-select-item.component';

// Env
import { environment } from '../environments/environment';

// Actions
import { UserDispatchers, SystemInfoDispatchers } from '../store';
import { FetchSystemInfo } from './../store/actions/system-info.actions';
import { FetchUserInfo } from '../store/actions/user.actions';
import { ReactiveFormsModule } from '@angular/forms';
import { QmInvalidLicenseComponent } from './components/presentational/qm-invalid-license/qm-invalid-license.component';
import { QmAppComponent } from './components/containers/qm-app/qm-app.component';
import { QmAppLoaderComponent } from './components/containers/qm-app-loader/qm-app-loader.component';
import { QmAppPageNotFoundComponent } from './components/presentational/qm-app-page-not-found/qm-app-page-not-found.component';

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

// Global options for Toastr
const toastrGlobalOptions = {
  maxOpened: 3,
  autoDismiss: true,
  iconClasses: {}
};

@NgModule({
  declarations: [
    AppComponent,
    QmPageFooterComponent,
    QmListComponent,
    QmListItemComponent,
    QmListSelectItemComponent,
    QmButtonComponent,
    QmActionButtonComponent,
    QmInvalidLicenseComponent,
    QmAppComponent,
    QmAppLoaderComponent,
    QmAppPageNotFoundComponent,
    QmPageHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducers, { metaReducers }),
    ReactiveFormsModule,
    ToastrModule.forRoot(toastrGlobalOptions),
    ToastContainerModule,
    StoreDevtoolsModule.instrument({
      maxAge: 20
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
  providers: [SPService, ToastService, TranslateService, ...storeServices, LicenseAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    private translate: TranslateService,
    private userDispatchers: UserDispatchers,
    private systemInfoDispatchers: SystemInfoDispatchers,
    private serviceDispachers: ServiceDispatchers,
    private branchDispatchers: BranchDispatchers,
private licenseInfoDispatchers: LicenseDispatchers,
    private router: Router
  ) {
    // No Suffix for english language file (staffBookingMessages.properties)
    this.translate.setDefaultLang('staffBookingMessages');

    this.userDispatchers.fetchUserInfo();
    this.systemInfoDispatchers.fetchSystemInfo();
    this.serviceDispachers.fetchServices();
    this.branchDispatchers.fetchBranches();
    this.licenseInfoDispatchers.fetchLicenseInfo();
    this.router.navigate(['/loading']);
  }
}

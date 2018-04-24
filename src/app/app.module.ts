import { ErrorInterceptor } from './../services/util/ErrorInterceptor.service';
import { UserRoleDispatchers } from './../store/services/user-role/user-role.dispatchers';
import { LicenseAuthGuard } from './../routes/license-auth-guard';
import { LicenseDispatchers } from './../store/services/license/license.dispatchers';
// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Ng Bootstrap, used for modals
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Ng Select
import { NgSelectModule } from '@ng-select/ng-select';

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
import { ModalService } from './../services/util/modal.service';
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
import { QmMainComponent } from './components/containers/qm-main/qm-main.component';
import { QmDashboardComponent } from './components/containers/qm-dashboard/qm-dashboard.component';

// Env
import { environment } from '../environments/environment';

// Actions
import { UserDispatchers, SystemInfoDispatchers } from '../store';
import { FetchSystemInfo } from './../store/actions/system-info.actions';
import { FetchUserInfo } from '../store/actions/user.actions';
import { QmInvalidLicenseComponent } from './components/presentational/qm-invalid-license/qm-invalid-license.component';
import { QmAppComponent } from './components/containers/qm-app/qm-app.component';
import { QmAppLoaderComponent } from './components/containers/qm-app-loader/qm-app-loader.component';
import { QmAppPageNotFoundComponent } from './components/presentational/qm-app-page-not-found/qm-app-page-not-found.component';
import { QmSearchBoxComponent } from './components/containers/qm-searchbox/qm-search-box.component';
import { QmCustomerSearchComponent } from './components/containers/qm-customer-search/qm-customer-search.component';
import { QmCustomerCardComponent } from './components/presentational/qm-customer-card/qm-customer-card.component';
import {
  QmCustomerSearchResultsComponent
} from './components/containers/qm-customer-search/components/qm-customer-search-results/qm-customer-search-results.component';
import { QmHighlightPipe } from './pipes/qm-highlight.pipe';
import { QmCustomerAppointmentsComponent } from './components/containers/qm-customer-appointments/qm-customer-appointments.component';
import { QmDropdownComponent } from './components/containers/qm-dropdown/qm-dropdown.component';
import {
  QmCustomerAppointmentListComponent
} from './components/containers/qm-customer-appointments/components/qm-customer-appointment-list/qm-customer-appointment-list.component';
import { QmAppointmentIconListComponent } from './components/presentational/qm-appointment-icon-list/qm-appointment-icon-list.component';
import { QmNotesComponent } from './components/presentational/qm-notes/qm-notes.component';
import { QmLoaderComponent } from './components/presentational/qm-loader/qm-loader.component';
import { QmAutofocusDirective } from './directives/qm-autofocus.directive';
import { QmAppointmentTitleComponent } from './components/presentational/qm-appointment-title/qm-appointment-title.component';
import { QmNotifyComponent } from './components/presentational/qm-notify/qm-notify.component';
import { QmCreateCustomerModalComponent } from './components/presentational/qm-create-customer-modal/qm-create-customer-modal.component';
import { QmSettingsAdminComponent } from './components/presentational/qm-settings-admin/qm-settings-admin.component';
import { QmUpdateCustomerModalComponent } from './components/presentational/qm-update-customer-modal/qm-update-customer-modal.component';

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
    QmPageHeaderComponent,
    QmMainComponent,
    QmDashboardComponent,
    QmSearchBoxComponent,
    QmCustomerSearchComponent,
    QmCustomerCardComponent,
    QmCustomerSearchResultsComponent,
    QmHighlightPipe,
    QmCustomerAppointmentsComponent,
    QmDropdownComponent,
    QmCustomerAppointmentListComponent,
    QmAppointmentIconListComponent,
    QmNotesComponent,
    QmLoaderComponent,
    QmAutofocusDirective,
    QmAppointmentTitleComponent,
    QmNotifyComponent,
    QmCreateCustomerModalComponent,
    QmSettingsAdminComponent,
    QmUpdateCustomerModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducers, { metaReducers }),
    ReactiveFormsModule,
    NgSelectModule,
    NgbModule.forRoot(),
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
  entryComponents: [QmCreateCustomerModalComponent, QmUpdateCustomerModalComponent],
  providers: [SPService, ToastService, ModalService, TranslateService, ...storeServices, LicenseAuthGuard, ErrorInterceptor],
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
    private userRoleDispatchers: UserRoleDispatchers,
    private router: Router
  ) {
    // No Suffix for english language file (staffBookingMessages.properties)
    this.translate.setDefaultLang('staffBookingMessages');
    this.licenseInfoDispatchers.fetchLicenseInfo();
    this.router.navigate(['/loading']);
  }
}

import { Logout } from './../services/util/logout.service';
import { TimeUtils } from './../services/util/timeUtils.service';
import { QmClearInputDirective } from './directives/qm-clear-input.directive';
import { SettingsAdminDataService } from './../store/services/settings-admin/settings-admin-data.service';
import { ErrorInterceptor } from './../services/util/ErrorInterceptor.service';
import { UserRoleDispatchers } from './../store/services/user-role/user-role.dispatchers';
import { LicenseAuthGuard } from './../routes/license-auth-guard';
import { LicenseDispatchers } from './../store/services/license/license.dispatchers';
// Angular
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Moment
import { MomentModule } from 'angular2-moment';
import { MomentTimezoneModule } from 'angular-moment-timezone';

// A11y
import { A11yModule } from '@angular/cdk/a11y';

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
import {
  TranslateModule,
  TranslateLoader,
  TranslateService
} from '@ngx-translate/core';
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
import {
  storeServices,
  BranchDispatchers,
  ServiceDispatchers,
  SettingsAdminDispatchers,
  ShiroDispatchers
} from '../store';

// Components
import { AppComponent } from './app.component';
import { QmPageFooterComponent } from './components/presentational/qm-page-footer/qm-page-footer.component';
import { QmButtonComponent } from './components/presentational/qm-button/qm-button.component';
import { QmActionButtonComponent } from './components/presentational/qm-action-button/qm-action-button.component';

// Containers
import { QmPageHeaderComponent } from './components/containers/qm-page-header/qm-page-header.component';
import { QmListComponent } from './components/containers/qm-list/qm-list.component';
import { QmListItemComponent } from './components/containers/qm-list-item/qm-list-item.component';
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
import { QmTruncatePipe } from './pipes/qm-truncate.pipe';
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
import { QmBookingFlowComponent } from './components/containers/qm-booking-flow/qm-booking-flow.component';
import { HtmlDecodePipe } from './components/presentational/qm-settings-admin/html-decode.pipe';
import { QmGenericModalComponent } from './components/presentational/qm-generic-modal/qm-generic-modal.component';
import { SettingsCheckboxComponent } from './components/presentational/qm-settings-admin/settings-checkbox/settings-checkbox.component';
import { SettingsTextboxComponent } from './components/presentational/qm-settings-admin/settings-textbox/settings-textbox.component';
import { SettingsListboxComponent } from './components/presentational/qm-settings-admin/settings-listbox/settings-listbox.component';
// tslint:disable-next-line:max-line-length
import { SettingsTimeformatComponent } from './components/presentational/qm-settings-admin/settings-timeformat/settings-timeformat.component';
import { DatePipe } from '@angular/common';
import { QmBookingFooterComponent } from './components/containers/qm-booking-footer/qm-booking-footer.component';
import { QmStandardRadioComponent } from './components/presentational/qm-standard-radio/qm-standard-radio.component';
import { CanDeactivateGuard } from '../routes/can-deactivatet';
import { QmModalComponent } from './components/presentational/qm-modal/qm-modal.component';
import { QmModalService } from './components/presentational/qm-modal/qm-modal.service';
import { QmReservationTimerComponent } from './components/containers/qm-reservation-timer/qm-reservation-timer.component';
import { QmIconItemComponent } from './components/presentational/qm-icon-item/qm-icon-item.component';
import { QmResourceTextComponent } from './components/presentational/qm-resource-text/qm-resource-text.component';
import { QmClearInputButtonComponent } from './directives/qm-clear-input-button/qm-clear-input-button.component';

import { QmMaxLengthValidatorDirective } from './directives/qm-max-length-validator.directive';
import { QmNotificationModalComponent } from './components/containers/qm-notification-modal/qm-notification-modal.component';
import { QmStandardCheckboxComponent } from './components/presentational/qm-standard-checkbox/qm-standard-checkbox.component';
import { QmBookingSidebarComponent } from './components/presentational/qm-booking-sidebar/qm-booking-sidebar.component';
import { QmAutoCloseComponent } from './components/containers/qm-auto-close/qm-auto-close.component';
import { AutoClose } from '../services/util/autoclose.service';
import { QmServiceBookerComponent } from './components/containers/qm-service-booker/qm-service-booker.component';
import { QmDateBookerComponent } from './components/containers/qm-date-booker/qm-date-booker.component';
import { BookingHelperService } from '../services/util/bookingHelper.service';
import {
  QmNumberOfCustomersBookerComponent
} from './components/containers/qm-number-of-customers-booker/qm-number-of-customers-booker.component';
import { QmBranchBookerComponent } from './components/containers/qm-branch-booker/qm-branch-booker.component';
import { QmTimeslotBookerComponent } from './components/containers/qm-timeslot-booker/qm-timeslot-booker.component';
import { GlobalErrorHandler } from '../services/util/global-error-handler.service';
import { QmAppointmentCardComponent } from './components/presentational/qm-appointment-card/qm-appointment-card.component';
import { AppUtils } from '../services/util/appUtils.service';
import { QmBookingHistoryComponent } from './components/containers/qm-booking-history/qm-booking-history.component';

// Console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    // if (
    //   action.type !== '[reservation-expiry-timer] SET_RESERVATION_EXPIRY_TIME'
    // ) {
    //   console.log('state', state);
    //   console.log('action', action);
    // }

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
    QmTruncatePipe,
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
    QmBookingFlowComponent,
    HtmlDecodePipe,
    QmGenericModalComponent,
    SettingsCheckboxComponent,
    SettingsTextboxComponent,
    SettingsListboxComponent,
    SettingsTimeformatComponent,
    QmBookingFooterComponent,
    QmStandardRadioComponent,
    QmModalComponent,
    QmReservationTimerComponent,
    QmIconItemComponent,
    QmResourceTextComponent,
    QmClearInputDirective,
    QmClearInputButtonComponent,
    QmMaxLengthValidatorDirective,
    QmNotificationModalComponent,
    QmStandardCheckboxComponent,
    QmBookingSidebarComponent,
    QmAutoCloseComponent,
    QmServiceBookerComponent,
    QmDateBookerComponent,
    QmNumberOfCustomersBookerComponent,
    QmBranchBookerComponent,
    QmTimeslotBookerComponent,
    QmAppointmentCardComponent,
    QmBookingHistoryComponent
  ],
  imports: [
    MomentTimezoneModule,
    MomentModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducers, { metaReducers }),
    ReactiveFormsModule,
    NgSelectModule,
    A11yModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot(toastrGlobalOptions),
    ToastContainerModule,
    ...(!environment.production
      ? [StoreDevtoolsModule.instrument({ maxAge: 10 })]
      : []),
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
  entryComponents: [
    QmCreateCustomerModalComponent,
    QmGenericModalComponent,
    QmModalComponent,
    QmClearInputButtonComponent,
    QmNotificationModalComponent
  ],
  providers: [
    QmModalService,
    SPService,
    ToastService,
    ModalService,
    TranslateService,
    ...storeServices,
    LicenseAuthGuard,
    ErrorInterceptor,
    CanDeactivateGuard,
    DatePipe,
    TimeUtils,
    AutoClose,
    Logout,
    BookingHelperService,
    GlobalErrorHandler,
    AppUtils
  ],
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
    private router: Router,
    private settingsAdminDispatchers: SettingsAdminDispatchers,
    private shiroDispatchers: ShiroDispatchers
  ) {
    // No Suffix for english language file (appointmentBookingMessages.properties)
    this.translate.setDefaultLang('appointmentBookingMessages');
    this.licenseInfoDispatchers.fetchLicenseInfo();
    this.router.navigate(['/loading']);
    this.settingsAdminDispatchers.fetchSettings();
    this.shiroDispatchers.startRefresh();
  }
}

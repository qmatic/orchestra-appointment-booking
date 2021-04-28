import { SettingsErrorGuard } from './settings-error-guard';
// tslint:disable-next-line:max-line-length
import { QmErrorComponent } from './../app/components/presentational/qm-error/qm-error.component';
import { QmPrintConfirmComponent } from './../app/components/presentational/qm-print-confirm/qm-print-confirm.component';
import { CanDeactivateGuard } from './can-deactivatet';
import { QmSettingsAdminComponent } from './../app/components/presentational/qm-settings-admin/qm-settings-admin.component';
import { QmAppPageNotFoundComponent } from './../app/components/presentational/qm-app-page-not-found/qm-app-page-not-found.component';
import { QmAppLoaderComponent } from './../app/components/containers/qm-app-loader/qm-app-loader.component';
import { LicenseAuthGuard } from './license-auth-guard';
import { QmAppComponent } from './../app/components/containers/qm-app/qm-app.component';
import { QmInvalidLicenseComponent } from './../app/components/presentational/qm-invalid-license/qm-invalid-license.component';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './../app/app.component';
import { QmAppointmentHistoryComponent } from './../app/components/containers/qm-appointment-history/qm-appointment-history.component';
import { QmAppointmentListComponent } from '../app/components/containers/qm-appointment-list/qm-appointment-list.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/app',
    pathMatch: 'full'
  },
  { path: 'loading', component: QmAppLoaderComponent },
  { path: 'app-history', component: QmAppointmentHistoryComponent },
  { path: 'app', component: QmAppComponent, canActivate: [LicenseAuthGuard, SettingsErrorGuard] },
  { path: 'app-list', component: QmAppointmentListComponent, canActivate: [LicenseAuthGuard, SettingsErrorGuard] },
  { path: 'invalid-license', component: QmInvalidLicenseComponent },
  { path: 'error', component: QmErrorComponent },
  { path: 'print-appointment', component: QmPrintConfirmComponent},
  { path: 'settings-admin', component: QmSettingsAdminComponent, canDeactivate: [CanDeactivateGuard]},
  { path: '**', component: QmAppPageNotFoundComponent }
];

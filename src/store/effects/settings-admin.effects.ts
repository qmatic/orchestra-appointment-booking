import { AppointmentMetaDispatchers } from './../services/appointment-meta/appointment-meta.dispatchers';
import { AppointmentMetaSelectors } from './../services/appointment-meta/appointment-meta.selectors';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store/src/models';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { SettingsAdminDispatchers } from './../services/settings-admin/settings-admin.dispatchers';
import { SaveSettings } from './../actions/settings-admin.actions';
import { SettingsAdminDataService } from './../services/settings-admin/settings-admin-data.service';
import * as SettingsAdminActions from './../actions';
import { ToastService } from '../../services/util/toast.service';
import { GlobalErrorHandler } from '../../services/util/global-error-handler.service';

const toAction = SettingsAdminActions.toAction();

@Injectable()
export class SettingsAdminEffects {

    constructor(
      private actions$: Actions,
      private settingsAdminDataService: SettingsAdminDataService,
      private translateService: TranslateService,
      private toastService: ToastService,
      private settingsDispatchers: SettingsAdminDispatchers,
      private errorHandler: GlobalErrorHandler,
      private router: Router,
      private appointmentMetaDispatchers: AppointmentMetaDispatchers
    ) {}

    @Effect()
    getSettings$: Observable<Action> = this.actions$
      .pipe(
        ofType(SettingsAdminActions.FETCH_SETTINGS),
        switchMap(() =>
          toAction(
            this.settingsAdminDataService.getSettings(),
            SettingsAdminActions.FetchSettingsSuccess,
            SettingsAdminActions.FetchSettingsFail
          )
        )
      );

      @Effect()
      saveSettings$: Observable<Action> = this.actions$
      .pipe(
        ofType(SettingsAdminActions.SAVE_SETTINGS),
        switchMap((action: SaveSettings) =>
          toAction(
            this.settingsAdminDataService.updateSettings(action.payload),
            SettingsAdminActions.SaveSettingsSuccess,
            SettingsAdminActions.SaveSettingsFail
          )
        )
      );

      @Effect({dispatch : false})
      saveSettingsSuccess$: Observable<Action> = this.actions$
        .pipe(
          ofType(SettingsAdminActions.SAVE_SETTINGS_SUCCESS),
          tap((action: SettingsAdminActions.SaveSettingsSuccess) => {
            this.settingsDispatchers.updateSettingsStore(action.payload);
            this.appointmentMetaDispatchers.resetAppointmentNotificationType();
            if (action.payload.updateSilently !== true) {
              this.router.navigate(['/app']).then(() => {
                setTimeout(() => {
                  this.translateService.get('message.settings.save.success').subscribe(
                    (label: string) =>  {
                      this.toastService.successToast(label);
                    }
                  ).unsubscribe();
                }, 200);
              });
            }
          }
          ),

          switchMap((action: SettingsAdminActions.SaveSettingsSuccess) =>
          []
        )
        );


        @Effect()
        saveSettingsFail$: Observable<Action> = this.actions$
          .pipe(
            ofType(SettingsAdminActions.SAVE_SETTINGS_FAIL),
            tap((action: SettingsAdminActions.SaveSettingsFail) =>
              this.errorHandler.showError('message.settings.save.fail', action.payload)
            ),
            switchMap((action: SettingsAdminActions.SaveSettingsFail) =>
              []
          )
          );
}

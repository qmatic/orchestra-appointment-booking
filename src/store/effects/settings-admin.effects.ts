import { SaveSettings } from './../actions/settings-admin.actions';
import { SettingsAdminDataService } from './../services/settings-admin/settings-admin-data.service';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { switchMap, tap } from 'rxjs/operators';
import * as SettingsAdminActions from './../actions';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '../../services/util/toast.service';

const toAction = SettingsAdminActions.toAction();

@Injectable()
export class SettingsAdminEffects {

    constructor(
      private actions$: Actions,
      private settingsAdminDataService: SettingsAdminDataService,
      private translateService: TranslateService,
      private toastService: ToastService
    ) {}

    @Effect()
    getSettings$: Observable<Action> = this.actions$
      .ofType(SettingsAdminActions.FETCH_SETTINGS)
      .pipe(
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
      .ofType(SettingsAdminActions.SAVE_SETTINGS)
      .pipe(
        switchMap((action: SaveSettings) =>
          toAction(
            this.settingsAdminDataService.updateSettings(action.payload),
            SettingsAdminActions.SaveSettingsSuccess,
            SettingsAdminActions.SaveSettingsFail
          )
        )
      );

      @Effect()
      saveSettingsSuccess$: Observable<Action> = this.actions$
        .ofType(SettingsAdminActions.SAVE_SETTINGS_SUCCESS)
        .pipe(
          tap((action: SettingsAdminActions.SaveSettingsSuccess) =>
            this.translateService.get('message.settings.save.success').subscribe(
              (label: string) => this.toastService.successToast(label)
            ).unsubscribe()
          ),
          switchMap((action: SettingsAdminActions.SaveSettingsSuccess) =>
            []
        )
        );


        @Effect()
        saveSettingsFail$: Observable<Action> = this.actions$
          .ofType(SettingsAdminActions.SAVE_SETTINGS_FAIL)
          .pipe(
            tap((action: SettingsAdminActions.SaveSettingsSuccess) =>
              this.translateService.get('message.settings.save.fail').subscribe(
                (label: string) => this.toastService.errorToast(label)
              ).unsubscribe()
            ),
            switchMap((action: SettingsAdminActions.SaveSettingsSuccess) =>
              []
          )
          );
}

import { SaveSettings } from './../actions/settings-admin.actions';
import { SettingsAdminDataService } from './../services/settings-admin/settings-admin-data.service';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import * as SettingsAdminActions from './../actions';

const toAction = SettingsAdminActions.toAction();

@Injectable()
export class SettingsAdminEffects {
    constructor(
      private actions$: Actions,
      private settingsAdminDataService: SettingsAdminDataService
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
            null,
            null
          )
        )
      );
}

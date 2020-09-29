
import {empty as observableEmpty,  Observable ,  of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, withLatestFrom } from 'rxjs/operators';


import * as AppointmentMetaActions from './../actions';
import { IAppState } from '../index';
import { Setting } from '../../models/Setting';

const toAction = AppointmentMetaActions.toAction();

@Injectable()
export class AppointmentMetaEffects {

  private PRESELECT_OPTION_NAME = 'OptionPreselect';
  private PRESELECT_NO_OPTION = 'PreSelectNoOption';
  private NO_OPTION = 'NoOption';
  private OPTION_UNAVAILABLE = 'unavailable';

  constructor(
    private store$: Store<IAppState>,
    private actions$: Actions
  ) {}

  @Effect()
  resetAppointmentMetaNotificationType$: Observable<Action> = this.actions$
    .pipe(
      ofType(AppointmentMetaActions.RESET_APPOINTMENT_NOTIFICATION_TYPE),
      withLatestFrom(this.store$.select((state: IAppState) => state.settings.settings.filter(
        (setting: Setting) => setting.name === this.PRESELECT_OPTION_NAME
      ))),
      switchMap((data: any) => {
        const [ action, setting ]: [ AppointmentMetaActions.ResetAppointmentNotificationType, Setting[] ] = data;
        if (setting && setting.length > 0
          && setting[0].value !== this.PRESELECT_NO_OPTION
          && setting[0].value !== this.NO_OPTION
          && setting[0].value !== this.OPTION_UNAVAILABLE) {
          return [new AppointmentMetaActions.SetAppointmentNotificationType(setting[0].value)];
        } else {
          return observableEmpty();
        }
      })
    );
}

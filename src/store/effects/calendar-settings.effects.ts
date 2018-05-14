import { CalendarSettingsService } from './../services/calendar-settings/calendar-settings.service';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { switchMap, tap } from 'rxjs/operators';

import * as CalendarActions from './../actions';

const toAction = CalendarActions.toAction();

@Injectable()
export class CalendarSettingsEffects {
  constructor(
    private actions$: Actions,
    private translate: TranslateService,
    private calendarSettingsService: CalendarSettingsService
  ) {}

  @Effect()
  getCalendarInfo$: Observable<Action> = this.actions$
    .ofType(CalendarActions.FETCH_CALENDAR_SETTINGS_INFO)
    .pipe(
      switchMap(() =>
        toAction(
          this.calendarSettingsService.getSerttingsInfo(),
          CalendarActions.FetchCalendarSettingsInfoSuccess,
          CalendarActions.FetchCalendarSettingsInfoFail
        )
      )
    );
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../reducers';

import * as Actions from '../../actions';

@Injectable()
export class CalendarSettingsDispatchers {
  constructor(private store: Store<IAppState>) {}

  fetchCalendarSettingsInfo() {
    this.store.dispatch(new Actions.FetchCalendarSettingsInfo());
  }
}

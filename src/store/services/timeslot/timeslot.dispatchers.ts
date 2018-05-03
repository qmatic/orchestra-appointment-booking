import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../reducers';
import * as TimeslotActions from '../../actions';
import { IBookingInformation } from '../../../models/IBookingInformation';

@Injectable()
export class TimeslotDispatchers {
  constructor(private store: Store<IAppState>) {}

  getTimeslots(bookingInformation: IBookingInformation) {
    this.store.dispatch(new TimeslotActions.FetchTimeslots(bookingInformation));
  }

  selectTimeslot(time: string) {
    this.store.dispatch(new TimeslotActions.SelectTimeslot(time));
  }

  deselectTimeslot() {
    this.store.dispatch(new TimeslotActions.DeselectTimeslot);
  }

  resetTimeslots() {
    this.store.dispatch(new TimeslotActions.ResetTimeslots);
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../reducers';
import * as DateActions from '../../actions';
import { IBookingInformation } from '../../../models/IBookingInformation';

@Injectable()
export class DateDispatchers {
  constructor(private store: Store<IAppState>) {}

  getDates(bookingInformation: IBookingInformation) {
    this.store.dispatch(new DateActions.FetchDates(bookingInformation));
  }

  selectDate(date: string) {
    this.store.dispatch(new DateActions.SelectDate(date));
  }

  deselectDate() {
    this.store.dispatch(new DateActions.DeselectDate);
  }

  resetDates() {
    this.store.dispatch(new DateActions.ResetDates);
  }

  filterDates(searchText: string) {
    this.store.dispatch(new DateActions.FilterDates(searchText));
  }

  resetDatesFilter() {
    this.store.dispatch(new DateActions.ResetFilterDates);
  }
}

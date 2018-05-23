import { Injectable } from '@angular/core';
import { Store, createSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { IBookingState } from '../../reducers/booking.reducer';
import { getCurrentCustomer } from '../customer';
import { getSelectedServices } from '../service';
import { getNumberOfCustomers } from '../number-of-customers';
import { getSelectedBranch } from '../branch';
import { getSelectedDate } from '../date';
import { getSelectedTimeslot } from '../timeslot';
import {
  getAppointmentMetaNotificationType,
  getAppointmentMetaTitle,
  getAppointmentMetaNotes
} from '../appointment-meta';

import { IService } from '../../../models/IService';

// selectors
const getBookingHelperBookingStarted = createSelector(
  getSelectedServices,
  getAppointmentMetaTitle,
  getAppointmentMetaNotes,
  (selectedServices: IService[], title: string, notes: string) =>
    selectedServices.length > 0 || title !== '' || notes !== '' ? true : false
);

@Injectable()
export class BookingHelperSelectors {
  constructor(
    private store: Store<IAppState>,
  ) {}
  // selectors$
  currentCustomer$ = this.store.select(getCurrentCustomer);
  selectedServices$ = this.store.select(getSelectedServices);
  selectedNumberOfCustomers$ = this.store.select(getNumberOfCustomers);
  selectedBranch$ = this.store.select(getSelectedBranch);
  selectedDate$ = this.store.select(getSelectedDate);
  selectedTime$ = this.store.select(getSelectedTimeslot);
  selectedNotificationType$ = this.store.select(getAppointmentMetaNotificationType);
  title$ = this.store.select(getAppointmentMetaTitle);
  notes$ = this.store.select(getAppointmentMetaNotes);
  bookingStarted$ = this.store.select(getBookingHelperBookingStarted);
}

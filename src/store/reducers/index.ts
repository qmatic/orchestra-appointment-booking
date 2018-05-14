import { ActionReducerMap } from '@ngrx/store';

import { Store } from '@ngrx/store';

import * as fromService from './service.reducer';
import * as fromBranch from './branch.reducer';
import * as fromSystemInfo from './system-info.reducer';
import * as fromUser from './user.reducer';
import * as fromLicense from './license.reducer';
import * as fromUserRole from './user-role.reducer';
import * as fromCustomer from './customer.reducer';
import * as fromAppointments from './appointment.reducer';
import * as fromAppointmentMeta from './appointment-meta.reducer';
import * as fromSettingsAdmin from './settings-admin.reducer';
import * as fromNumberOfCustomers from './number-of-customers.reducer';
import * as fromDates from './date.reducer';
import * as fromTimeslot from './timeslot.reducer';
import * as fromReserve from './reserve.reducer';
import * as fromAccount from './account.reducer';
import * as fromBooking from './booking.reducer';
import * as fromCalendarSettings from './calendar-settings.reducer';
import * as fromReservationTimer from './reservation-expiry-timer.reducer';

export interface IAppState {
  services: fromService.IServiceState;
  branches: fromBranch.IBranchState;
  systemInfo: fromSystemInfo.ISystemInfoState;
  // user: fromUser.IUserState;
  license: fromLicense.ILicenseState;
  // userRole: fromUserRole.IUserRoleState;
  customers: fromCustomer.ICustomerState;
  appointments: fromAppointments.IAppointmentState;
  appointmentMeta: fromAppointmentMeta.IAppointmentMetaState;
  settings: fromSettingsAdmin.ISettingsAdminState;
  numberOfCustomers: fromNumberOfCustomers.INumberOfCustomersState;
  dates: fromDates.IDatesState;
  timeslot: fromTimeslot.ITimeslotState;
  reserved: fromReserve.IReserveState;
  account: fromAccount.IAccountState;
  booked: fromBooking.IBookingState;
  calendarSettings: fromCalendarSettings.ICalendarSettingsState;
  reservationExpiryTimer: fromReservationTimer.IReservationTimerState;
}

export const reducers: ActionReducerMap<IAppState> = {
  services: fromService.reducer,
  branches: fromBranch.reducer,
  systemInfo: fromSystemInfo.reducer,
  // user: fromUser.reducer,
  license: fromLicense.reducer,
  // userRole: fromUserRole.reducer,
  customers: fromCustomer.reducer,
  appointments: fromAppointments.reducer,
  appointmentMeta: fromAppointmentMeta.reducer,
  settings: fromSettingsAdmin.reducer,
  numberOfCustomers: fromNumberOfCustomers.reducer,
  dates: fromDates.reducer,
  timeslot: fromTimeslot.reducer,
  reserved: fromReserve.reducer,
  account: fromAccount.reducer,
  booked: fromBooking.reducer,
  calendarSettings: fromCalendarSettings.reducer,
  reservationExpiryTimer: fromReservationTimer.reducer
  // here is where you put other reducers, when you have them
};

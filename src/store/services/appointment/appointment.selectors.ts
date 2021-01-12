import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { IAppointmentState } from '../../reducers/appointment.reducer';

// selectors
const getAppointmentState = createFeatureSelector<IAppointmentState>('appointments');

const getAllAppointments = createSelector(
  getAppointmentState,
  (state: IAppointmentState) => state.appointments
);

const getSelectedAppointment = createSelector(
  getAppointmentState,
  (state: IAppointmentState) => state.selectedAppointment
);

const getQPAppointment = createSelector(
  getAppointmentState,
  (state: IAppointmentState) => state.qpAppointment
);

const getAppointmentsLoading = createSelector(
  getAppointmentState,
  (state: IAppointmentState) => state.loading
);

const getAppointmentsLoaded = createSelector(
  getAppointmentState,
  (state: IAppointmentState) => state.loaded
);

const getAppointmentsError = createSelector(
  getAppointmentState,
  (state: IAppointmentState) => state.error
);

const getEmailTemplete = createSelector(
  getAppointmentState,
  (state: IAppointmentState) => state.emailTemplete
);

@Injectable()
export class AppointmentSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  appointments$ = this.store.select(getAllAppointments);
  selectedAppointment$ = this.store.select(getSelectedAppointment);
  qpAppointment$ = this.store.select(getQPAppointment);
  appointmentsLoading$ = this.store.select(getAppointmentsLoading);
  appointmentsLoaded$ = this.store.select(getAppointmentsLoaded);
  appointmentsError$ = this.store.select(getAppointmentsError);
  emailTemplete$ = this.store.select(getEmailTemplete);
}

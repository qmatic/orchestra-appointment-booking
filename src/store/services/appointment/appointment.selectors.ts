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

const getAppointmentById = createSelector(
  getAppointmentState,
  (state: IAppointmentState) => state.appointment
);

const getAppointmentList = createSelector(
  getAppointmentState,
  (state: IAppointmentState) => state.appointmentList
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
const getAppointmentByIdLoading = createSelector(
  getAppointmentState,
  (state: IAppointmentState) => state.loading
);

const getAppointmentByIdLoaded = createSelector(
  getAppointmentState,
  (state: IAppointmentState) => state.loaded
);

const getAppointmentByIdError = createSelector(
  getAppointmentState,
  (state: IAppointmentState) => state.error
);

const getEmailTemplete = createSelector(
  getAppointmentState,
  (state: IAppointmentState) => state.emailTemplete
);

const getResentAppointmentId = createSelector(
  getAppointmentState,
  (state: IAppointmentState) => state.resentAppoinmentId
);
@Injectable()
export class AppointmentSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  appointments$ = this.store.select(getAllAppointments);
  appointmentList$ = this.store.select(getAppointmentList);
  selectedAppointment$ = this.store.select(getSelectedAppointment);
  qpAppointment$ = this.store.select(getQPAppointment);
  appointmentsLoading$ = this.store.select(getAppointmentsLoading);
  appointmentsLoaded$ = this.store.select(getAppointmentsLoaded);
  appointmentsError$ = this.store.select(getAppointmentsError);
  emailTemplete$ = this.store.select(getEmailTemplete);
  resentAppointmentId$ = this.store.select(getResentAppointmentId);
  appointment$ = this.store.select(getAppointmentById);
  appointmentLoading$ = this.store.select(getAppointmentByIdLoading);
  appointmentLoaded$ = this.store.select(getAppointmentByIdLoaded);
  appointmentError$ = this.store.select(getAppointmentByIdError);
}

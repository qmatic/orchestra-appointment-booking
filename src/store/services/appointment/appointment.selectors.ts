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

@Injectable()
export class AppointmentSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  appointments$ = this.store.select(getAllAppointments);
  appointmentsLoading$ = this.store.select(getAppointmentsLoading);
  appointmentsLoaded$ = this.store.select(getAppointmentsLoaded);
  appointmentsError$ = this.store.select(getAppointmentsError);
}

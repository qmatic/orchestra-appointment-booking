import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';
import { IAppointmentHistoryState } from '../../reducers/appointment-history.reducer';

import { IAppState } from '../../reducers';

// selectors
const getAppointmentHistoryState = createFeatureSelector<IAppointmentHistoryState>('historyAppointments');

const getAllAppointments = createSelector(
  getAppointmentHistoryState,
  (state: IAppointmentHistoryState) => state.appointments
);

const getAppointmentById = createSelector(
    getAppointmentHistoryState,
  (state: IAppointmentHistoryState) => state.appointment
);

const getAppointmentVisit = createSelector(
  getAppointmentHistoryState,
  (state: IAppointmentHistoryState) => state.appointmentVisit
);

const getAppointmentsLoading = createSelector(
    getAppointmentHistoryState,
    (state: IAppointmentHistoryState) => state.loading
  );
  
  const getAppointmentsLoaded = createSelector(
    getAppointmentHistoryState,
    (state: IAppointmentHistoryState) => state.loaded
  );

  const getAppointmentByIdLoading = createSelector(
    getAppointmentHistoryState,
    (state: IAppointmentHistoryState) => state.loading
  );
  
  const getAppointmentByIdLoaded = createSelector(
    getAppointmentHistoryState,
    (state: IAppointmentHistoryState) => state.loaded
  );

  const getTablePageSize = createSelector(
    getAppointmentHistoryState,
    (state: IAppointmentHistoryState) => state.tablePageSize
  );

@Injectable()
export class AppointmentHistorySelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  historyAppointments$ = this.store.select(getAllAppointments);
  appointmentVisit$ = this.store.select(getAppointmentVisit);
  appointment$ = this.store.select(getAppointmentById);
  appointmentsLoading$ = this.store.select(getAppointmentsLoading);
  appointmentsLoaded$ = this.store.select(getAppointmentsLoaded);
  appointmentLoading$ = this.store.select(getAppointmentByIdLoading);
  appointmentLoaded$ = this.store.select(getAppointmentByIdLoaded);
  tablepageSize$ = this.store.select(getTablePageSize);
}

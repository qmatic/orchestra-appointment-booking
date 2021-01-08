import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { IAppointmentMetaState } from '../../reducers/appointment-meta.reducer';

// selectors
const getAppointmentMetaState = createFeatureSelector<IAppointmentMetaState>('appointmentMeta');


export const getAppointmentMetaNotificationType = createSelector(
  getAppointmentMetaState,
  (state: IAppointmentMetaState) => state.notificationType
);

export const getAppointmentMetaTitle = createSelector(
  getAppointmentMetaState,
  (state: IAppointmentMetaState) => state.title
);

export const getAppointmentMetaNotes = createSelector(
  getAppointmentMetaState,
  (state: IAppointmentMetaState) => state.notes
);

const getAppointmentMetaNotesLength = createSelector(
  getAppointmentMetaState,
  (state: IAppointmentMetaState) => state.notes.length
);

const getAppointmentMetaExternalNotesLength = createSelector(
  getAppointmentMetaState,
  (state: IAppointmentMetaState) => state.externalNotes.length
);


const getPrintAppointmentOption = createSelector(
  getAppointmentMetaState,
  (state: IAppointmentMetaState) => state.printAppointmentOption
);

const getExternalNote = createSelector(
  getAppointmentMetaState,
  (state: IAppointmentMetaState) => state.externalNotes
);

@Injectable()
export class AppointmentMetaSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  notificationType$ = this.store.select(getAppointmentMetaNotificationType);
  title$ = this.store.select(getAppointmentMetaTitle);
  notes$ = this.store.select(getAppointmentMetaNotes);
  notesLength$ = this.store.select(getAppointmentMetaNotesLength);
  externalnotesLength$ = this.store.select(getAppointmentMetaExternalNotesLength);
  printAppointmentOption$ = this.store.select(getPrintAppointmentOption);
  externalNotes$ = this.store.select(getExternalNote);
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../reducers';
import * as AppointmentMetaActions from '../../actions';

@Injectable()
export class AppointmentMetaDispatchers {
  constructor(private store: Store<IAppState>) {}

  setAppointmentNotificationType(notificationType: string) {
    this.store.dispatch(new AppointmentMetaActions.SetAppointmentNotificationType(notificationType));
  }

  setAppointmentTitle(title: string) {
    this.store.dispatch(new AppointmentMetaActions.SetAppointmentTitle(title));
  }

  setPrintAppointment(print: boolean) {
    this.store.dispatch(new AppointmentMetaActions.PrintAppointmentOption(print));
  }

  setExternalNote(note: string) {
    this.store.dispatch(new AppointmentMetaActions.setExternalNote(note));
  }

  setAppointmentNote(note: string) {
    this.store.dispatch(new AppointmentMetaActions.SetAppointmentNote(note));
  }

  resetAppointmentNotificationType() {
    this.store.dispatch(new AppointmentMetaActions.ResetAppointmentNotificationType);
  }

  resetAppointmentTitle() {
    this.store.dispatch(new AppointmentMetaActions.ResetAppointmentTitle);
  }

  resetAppointmentNote() {
    this.store.dispatch(new AppointmentMetaActions.ResetAppointmentNote);
  }
  resetAppointmentExternalNote() {
    this.store.dispatch(new AppointmentMetaActions.ResetAppointmentExternalNote);
  }
  resetAllAppointmentMeta() {
    this.store.dispatch(new AppointmentMetaActions.ResetAppointmentNotificationType);
    this.store.dispatch(new AppointmentMetaActions.ResetAppointmentTitle);
    this.store.dispatch(new AppointmentMetaActions.ResetAppointmentNote);
    this.store.dispatch(new AppointmentMetaActions.ResetAppointmentExternalNote);
  }
}

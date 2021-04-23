import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../reducers';
import * as AppointmentActions from '../../actions';
import { IAppointment } from '../../../models/IAppointment';

@Injectable()
export class AppointmentDispatchers {
  constructor(private store: Store<IAppState>) {}

  fetchAppointments(publicId: string) {
    this.store.dispatch(new AppointmentActions.FetchAppointments(publicId));
  }

  fetchAppointmentList(fromDate: string, toDate: string, branchId: string) {
    this.store.dispatch(new AppointmentActions.FetchAppointmentList( { fromDate: fromDate, toDate: toDate, branchId: branchId }));
  }
  resetAppointmentList() {
    this.store.dispatch(new AppointmentActions.ResetAppointmentList);
  }

  fetchActionAppointments(publicId: string) {
    this.store.dispatch(new AppointmentActions.FetchActionAppointments(publicId));
  }

  deleteAppointment(appointment: IAppointment) {
    this.store.dispatch(new AppointmentActions.DeleteAppointment(appointment));
  }

  resetAppointments() {
    this.store.dispatch(new AppointmentActions.ResetAppointments);
  }

  selectAppointment(appointment: IAppointment) {
    this.store.dispatch(new AppointmentActions.SelectAppointment(appointment));
  }

  resetAppointment() {
    this.store.dispatch(new AppointmentActions.ResetAppointment);
  }

  fetchAppointmentQP(appointmentId: string) {
    this.store.dispatch(new AppointmentActions.FetchAppointmentQP(appointmentId));
  }

  fetchAppointmentEmailTemplete(appointmentExternalId: string) {
    this.store.dispatch(new AppointmentActions.FetchAppointmentEmailTemplete(appointmentExternalId));
  }
  
  resendAppointmentConfirmation (appointment: IAppointment) {
    this.store.dispatch(new AppointmentActions.ResendAppointmentConfrimaton(appointment));
  }

  setAppointmentStatEvent(appointment: IAppointment) {
    this.store.dispatch(new AppointmentActions.SetAppointmentStatEvent(appointment));
  }
  SetResendAppointmentId(id: string) {
    this.store.dispatch(new AppointmentActions.SetResendAppointmentId(id));
  }
  ResetAppointmentLoaded() {
    this.store.dispatch(new AppointmentActions.ResetAppointmentLoaded());
  }
}

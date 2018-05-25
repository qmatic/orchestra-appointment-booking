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
}

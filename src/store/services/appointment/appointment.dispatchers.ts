import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../reducers';
import * as AppointmentActions from '../../actions';

@Injectable()
export class AppointmentDispatchers {
  constructor(private store: Store<IAppState>) {}

  fetchAppointments(publicId: string) {
    this.store.dispatch(new AppointmentActions.FetchAppointments(publicId));
  }

  resetAppointments() {
    this.store.dispatch(new AppointmentActions.ResetAppointments);
  }
}

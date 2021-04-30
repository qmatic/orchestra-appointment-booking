import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../reducers';
import * as AppointmentHistoryActions from '../../actions';
import { IAppointment } from '../../../models/IAppointment';

@Injectable()
export class AppointmentHistoryDispatchers {
  constructor(private store: Store<IAppState>) {}

  fetchActionsAppointments(publicId: string) {
    this.store.dispatch(new AppointmentHistoryActions.FetchActionAppointments(publicId));
  }

  fetchSelectedAppointment(appId: number) {
    this.store.dispatch(new AppointmentHistoryActions.FetchSelectedAppointment(appId));
  }

  fetchAppointmentVisit(qpId: number) {
    this.store.dispatch(new AppointmentHistoryActions.FetchVisitData(qpId));
  }

  resetActionAppointment() {
    this.store.dispatch(new AppointmentHistoryActions.ResetActionAppointments());
  }

  resetAppointmentVisit() {
    this.store.dispatch(new AppointmentHistoryActions.ResetAppointmentVisit());
  }

}

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

  setAppointmentNote(note: string) {
    this.store.dispatch(new AppointmentMetaActions.SetAppointmentNote(note));
  }
}

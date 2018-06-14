import { AllPrintActions } from './../../actions/print.actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../reducers';
import * as AppointmentMetaActions from '../../actions';
import { IAppointment } from '../../../models/IAppointment';
import * as Actions from '../../actions';

@Injectable()
export class PrintDispatchers {
  constructor(private store: Store<IAppState>) {}

  setPrintedAppointment(appointment: IAppointment) {
    this.store.dispatch(new Actions.PrintAppointment(appointment));
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../reducers';

import * as Actions from '../../actions';

@Injectable()
export class ReservationExpiryTimerDispatchers {
  constructor(private store: Store<IAppState>) {}

  showReservationExpiryTimer() {
    this.store.dispatch(new Actions.ShowReservationExpiryTimer());
  }
}

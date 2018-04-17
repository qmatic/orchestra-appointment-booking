import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../reducers';
import * as BookingActions from '../../actions';

@Injectable()
export class BookingDispatchers {
  constructor(private store: Store<IAppState>) {}

  setBookingNote(note: string) {
    this.store.dispatch(new BookingActions.SetBookingNote(note));
  }
}

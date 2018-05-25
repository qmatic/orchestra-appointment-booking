import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../reducers';
import * as NumberOfCustomersActions from '../../actions';

@Injectable()
export class NumberOfCustomersDispatchers {
  constructor(private store: Store<IAppState>) {}

  setNumberOfCustomers(numberOfCustomers: number) {
    this.store.dispatch(new NumberOfCustomersActions.SetNumberOfCustomers(numberOfCustomers));
  }

  resetNumberOfCustomers() {
    this.store.dispatch(new NumberOfCustomersActions.ResetNumberOfCustomers);
  }

  loadNumberOfCustomers(numberOfCustomers: number) {
    this.store.dispatch(new NumberOfCustomersActions.LoadSelectedNumberOfCustomers(numberOfCustomers));
  }
}

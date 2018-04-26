import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { INumberOfCustomersState } from '../../reducers/number-of-customers.reducer';

// selectors
const getNumberOfCustomersState = createFeatureSelector<INumberOfCustomersState>('numberOfCustomers');

const getNumberOfCustomers = createSelector(
  getNumberOfCustomersState,
  (state: INumberOfCustomersState) => state.numberOfCustomers
);

const getMaxNumberOfCustomers = createSelector(
  getNumberOfCustomersState,
  (state: INumberOfCustomersState) => state.maxNumberOfCustomers
);

@Injectable()
export class NumberOfCustomersSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  numberOfCustomers$ = this.store.select(getNumberOfCustomers);
  maxNumberOfCustomers$ = this.store.select(getMaxNumberOfCustomers);
}

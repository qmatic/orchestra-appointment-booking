import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { ICustomerState } from '../../reducers/customer.reducer';

// selectors
const getCustomerState = createFeatureSelector<ICustomerState>('customers');

const getAllCustomers = createSelector(
  getCustomerState,
  (state: ICustomerState) => state.customers
);

const getCurrentCustomer = createSelector(
  getCustomerState,
  (state: ICustomerState) => state.currentCustomer
);

const getSearchText = createSelector(
  getCustomerState,
  (state: ICustomerState) => state.searchText
);

@Injectable()
export class CustomerSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  customers$ = this.store.select(getAllCustomers);
  currentCustomer$ = this.store.select(getCurrentCustomer);
  getSearchText$ = this.store.select(getSearchText);
}

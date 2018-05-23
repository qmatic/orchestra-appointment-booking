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

export const getCurrentCustomer = createSelector(
  getCustomerState,
  (state: ICustomerState) => state.currentCustomer
);

const getSearchText = createSelector(
  getCustomerState,
  (state: ICustomerState) => state.searchText
);

const getCustomersLoading = createSelector(
  getCustomerState,
  (state: ICustomerState) => state.loading
);

const getCustomersLoaded = createSelector(
  getCustomerState,
  (state: ICustomerState) => state.loaded
);

@Injectable()
export class CustomerSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  customers$ = this.store.select(getAllCustomers);
  customersLoading$ = this.store.select(getCustomersLoading);
  customersLoaded$ = this.store.select(getCustomersLoaded);
  currentCustomer$ = this.store.select(getCurrentCustomer);
  searchText$ = this.store.select(getSearchText);
}

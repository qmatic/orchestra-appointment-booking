import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../reducers';
import * as CustomerActions from '../../actions';
import { ICustomer } from '../../../models/ICustomer';

@Injectable()
export class CustomerDispatchers {
  constructor(private store: Store<IAppState>) {}

  fetchCustomers(searchText: string) {
    this.store.dispatch(new CustomerActions.FetchCustomers(searchText));
  }

  resetCustomers() {
    this.store.dispatch(new CustomerActions.ResetCustomers);
  }

  selectCustomer(customer: ICustomer) {
    this.store.dispatch(new CustomerActions.SelectCustomer(customer));
  }

  resetCurrentCustomer() {
    this.store.dispatch(new CustomerActions.ResetCurrentCustomer);
  }

  updateCustomerSearchText(searchText: string) {
    this.store.dispatch(new CustomerActions.UpdateCustomerSearchText(searchText));
  }

  resetCustomerSearchText() {
    this.store.dispatch(new CustomerActions.ResetCustomerSearchText);
  }
}

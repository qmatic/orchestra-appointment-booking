import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { INumberOfCustomersState } from '../../reducers/number-of-customers.reducer';

import { getSelectedServices } from '../service';
import { getSettingsAsMap } from '../settings-admin';
import { IService } from '../../../models/IService';
import { Setting } from '../../../models/Setting';

// selectors
const getNumberOfCustomersState = createFeatureSelector<INumberOfCustomersState>('numberOfCustomers');

export const getNumberOfCustomers = createSelector(
  getNumberOfCustomersState,
  (state: INumberOfCustomersState) => state.numberOfCustomers
);

const getSelectableNumberOfCustomers = createSelector(
  getSelectedServices,
  getSettingsAsMap,
  (selectedServices: IService[], settingsMap: { [name: string]: Setting }) => {
    const hasSelectedServices = selectedServices.length > 0;
    // If no selected services return empty array
    if (!hasSelectedServices) { return []; }

    // Otherwise check if only one customer should be available
    const onlyOneCustomerAvailable = selectedServices.reduce(
      (shouldSetToOne: boolean, selectedService: IService) => {
        return shouldSetToOne
                ? selectedService.additionalCustomerDuration === 0
                : false;
      },
      true
    );

    if (onlyOneCustomerAvailable) {
      return createNumberOfCustomersArray(1);
    } else {
      return createNumberOfCustomersArray(settingsMap.MaxCustomers.value);
    }
  }
);

function createNumberOfCustomersArray(maxNumberOfCustomers: number): Array<number> {
  return Array.from({length: maxNumberOfCustomers}, (v, k) => k + 1);
}

@Injectable()
export class NumberOfCustomersSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  numberOfCustomers$ = this.store.select(getNumberOfCustomers);
  numberOfCustomersArray$ = this.store.select(getSelectableNumberOfCustomers);
}

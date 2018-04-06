import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../reducers';
import { IServiceState } from '../reducers/service.reducer';

// selectors
const getServiceState = createFeatureSelector<IServiceState>('services');

const getAllServices = createSelector(
  getServiceState,
  (state: IServiceState) => state.services
);

const getSelectedServices = createSelector(
  getServiceState,
  (state: IServiceState) => state.selectedServices
);

const getFilteredServices = createSelector(
  getServiceState,
  (state: IServiceState) => state.filteredServices
);

@Injectable()
export class ServiceSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  services$ = this.store.select(getAllServices);
  selectedServices$ = this.store.select(getSelectedServices);
  filteredServices$ = this.store.select(getFilteredServices);
}

import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { ILicenseState } from './../../reducers/license.reducer';

// selectors
const getLicenseInfoState = createFeatureSelector<ILicenseState>('license');


const getLicenseStatus = createSelector(
  getLicenseInfoState,
  (state: ILicenseState) => state.status
);

const getLicenseInfo = createSelector(
  getLicenseInfoState,
  (state: ILicenseState) => state
);

const isLicenseLoaded = createSelector(
  getLicenseInfoState,
  (state: ILicenseState) => state.loaded
);


@Injectable()
export class LicenseInfoSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  isValidLicense$ = this.store.select(getLicenseStatus);
  getLicenseInfo$ = this.store.select(getLicenseInfo);
  isLicenseLoaded$ = this.store.select(isLicenseLoaded);
}

import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { ISystemInfoState } from '../../reducers/system-info.reducer';
import { ISystemInfo } from '../../../models/ISystemInfo';

// selectors
const getSystemInfoState = createFeatureSelector<ISystemInfoState>('systemInfo');


const getSystemInfo = createSelector(
  getSystemInfoState,
  (state: ISystemInfoState) => state.data
);

const getSystemInfoProductName = createSelector(
  getSystemInfo,
  (state: ISystemInfo) => state.productName
);

const getSystemInfoReleaseName = createSelector(
  getSystemInfo,
  (state: ISystemInfo) => state.releaseName
);

const getSystemInfoProductVersion = createSelector(
  getSystemInfo,
  (state: ISystemInfo) => state.productVersion
);

const getSystemInfoLicenseCompanyName = createSelector(
  getSystemInfo,
  (state: ISystemInfo) => state.licenseCompanyName
);

const getTimeConvention = createSelector(
  getSystemInfo,
  (state: ISystemInfo) => state.timeConvention
);

const getDateConvention = createSelector(
  getSystemInfo,
  (state: ISystemInfo) => state.dateConvention
);


@Injectable()
export class SystemInfoSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  systemInfo$ = this.store.select(getSystemInfo);
  systemInfoProductName$ = this.store.select(getSystemInfoProductName);
  systemInfoReleaseName$ = this.store.select(getSystemInfoReleaseName);
  systemInfoProductVersion$ = this.store.select(getSystemInfoProductVersion);
  systemInfoLicenseCompanyName$ = this.store.select(getSystemInfoLicenseCompanyName);
  systemInfoTimeConvention$ = this.store.select(getTimeConvention);
  systemInfoDateConvention$ = this.store.select(getDateConvention);
}

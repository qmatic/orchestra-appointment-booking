export * from './actions';
export * from './effects';
export * from './reducers';
export * from './services';

import {
  BranchDataService,
  BranchDispatchers,
  BranchSelectors,
  SystemInfoDataService,
  SystemInfoDispatchers,
  SystemInfoSelectors,
  UserDataService,
  UserDispatchers,
  UserSelectors
} from './services';

export const storeServices = [
  BranchDataService,
  BranchDispatchers,
  BranchSelectors,
  SystemInfoDataService,
  SystemInfoDispatchers,
  SystemInfoSelectors,
  UserDataService,
  UserDispatchers,
  UserSelectors
];

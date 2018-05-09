import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { IBranchState } from '../../reducers/branch.reducer';
import { IBranch } from '../../../models/IBranch';
import { getSelectedServices, getServiceGroups } from '../service';
import { IService } from '../../../models/IService';
import { IServiceGroup } from '../../../models/IServiceGroup';
import { IServiceGroupList } from '../../../models/IServiceGroupList';
import { getNumberOfCustomers } from '../number-of-customers';


// selectors
const getBranchState = createFeatureSelector<IBranchState>('branches');

const getAllBranches = createSelector(
  getBranchState,
  (state: IBranchState) => state.branches
);

const getVisibleBranches = createSelector(
  getBranchState,
  getSelectedServices,
  getServiceGroups,
  getNumberOfCustomers,
  (
    branchState: IBranchState,
    selectedServices: IService[],
    serviceGroups: IServiceGroup[],
    numberOfCustomers: number,
  ) => {
    const hasSelectedServices = selectedServices.length > 0;
    const serviceGroupsLoaded = serviceGroups.length > 0;
    const hasSelectedNumberOfCustomers = numberOfCustomers !== null;

    if (serviceGroupsLoaded && hasSelectedServices && hasSelectedNumberOfCustomers) {
      const visibleBranchPublicIds = getBranchPublicIdsThatHasService(selectedServices, serviceGroups);

      if (visibleBranchPublicIds.length > 0) {
        return getFilteredVisibleDates(branchState, visibleBranchPublicIds);
      } else {
        return [];
      }
    } else {
      return [];
    }
  }
);

export const getSelectedBranch = createSelector(
  getBranchState,
  (state: IBranchState) => state.selectedBranch
);

const getBranchesSearchText = createSelector(
  getBranchState,
  (state: IBranchState) => state.searchText
);

function getBranchPublicIdsThatHasService(
  selectedServices: IService[],
  serviceGroups: IServiceGroup[]
) {
  const tmpBranchPublicIds: Array<string> = [];
  serviceGroups.forEach(
    (serviceGroup: IServiceGroup) => {
      serviceGroup.serviceGroups.forEach(
        (serviceGroupList: IServiceGroupList) => {
          serviceGroupList.services.forEach(
            (service: IService) => {
              selectedServices.forEach(
                (selectedService: IService) => {
                  if (service.publicId === selectedService.publicId) {
                    if (tmpBranchPublicIds.indexOf(serviceGroup.branchPublicId) === -1) {
                      tmpBranchPublicIds.push(serviceGroup.branchPublicId);
                    }
                  }
                }
              );
            }
          );
        }
      );
    }
  );
  return tmpBranchPublicIds;
}

function getFilteredVisibleDates(
  branchState: IBranchState,
  visibleBranchPublicIds: Array<string>
) {
  return branchState.searchText === ''
          ? branchState.branches.filter(
              (branch: IBranch) => visibleBranchPublicIds.includes(branch.publicId)
            )
          : branchState.branches.filter(
            (branch: IBranch) => visibleBranchPublicIds.includes(branch.publicId)
              && branch.name.toLowerCase().indexOf(branchState.searchText.toLowerCase()) !== -1
            );
}

@Injectable()
export class BranchSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  branches$ = this.store.select(getAllBranches);
  selectedBranch$ = this.store.select(getSelectedBranch);
  visibleBranches$ = this.store.select(getVisibleBranches);
  searchText$ = this.store.select(getBranchesSearchText);
}

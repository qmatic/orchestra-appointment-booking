import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { IBranchState } from '../../reducers/branch.reducer';
import { IBranch } from '../../../models/IBranch';
import { getSelectedServices, getServiceGroups } from '../service';
import { IService } from '../../../models/IService';
import { IServiceGroup } from '../../../models/IServiceGroup';
import { IServiceGroupList } from '../../../models/IServiceGroupList';


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
  (
    branchState: IBranchState,
    selectedServices: IService[],
    serviceGroups: IServiceGroup[]
  ) => {
    const hasSelectedServices = selectedServices.length > 0;
    const serviceGroupsLoaded = serviceGroups.length > 0;

    if (serviceGroupsLoaded && hasSelectedServices) {
      const visibleBranchPublicIds = getBranchPublicIdsThatHasService(selectedServices, serviceGroups);

      if (visibleBranchPublicIds.length > 0) {
        return branchState.searchText === ''
                ? branchState.branches.filter(
                    (branch: IBranch) => visibleBranchPublicIds.includes(branch.publicId)
                  )
                : branchState.branches.filter(
                  (branch: IBranch) => visibleBranchPublicIds.includes(branch.publicId)
                    && branch.name.toLowerCase().indexOf(branchState.searchText.toLowerCase()) !== -1
                );
      } else {
        return [];
      }
    } else {
      return [];
    }
  }
);

const getSelectedBranch = createSelector(
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

@Injectable()
export class BranchSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  branches$ = this.store.select(getAllBranches);
  selectedBranch$ = this.store.select(getSelectedBranch);
  visibleBranches$ = this.store.select(getVisibleBranches);
  searchText$ = this.store.select(getBranchesSearchText);
}

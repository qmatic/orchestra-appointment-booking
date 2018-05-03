import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { IServiceState } from '../../reducers/service.reducer';
import { IService } from '../../../models/IService';
import { IServiceGroup } from '../../../models/IServiceGroup';
import { IServiceGroupList } from '../../../models/IServiceGroupList';
import { getSettingsAsMap } from '../settings-admin';
import { Setting } from '../../../models/Setting';

// selectors
const getServiceState = createFeatureSelector<IServiceState>('services');

const getAllServices = createSelector(
  getServiceState,
  (state: IServiceState) => state.services
);

export const getSelectedServices = createSelector(
  getServiceState,
  (state: IServiceState) => state.selectedServices
);

export const getServiceGroups = createSelector(
  getServiceState,
  (state: IServiceState) => state.serviceGroups
);

const getVisibleServices = createSelector(
  getServiceState,
  getSettingsAsMap,
  (state: IServiceState, settingsMap: { [name: string]: Setting }) => {
    const hasSelectedServices = state.selectedServices.length > 0;
    const serviceGroupsLoaded = state.serviceGroups.length > 0;
    const isMultiServicesEnabled = settingsMap.AllowMultiService.value;

    if (hasSelectedServices && serviceGroupsLoaded && isMultiServicesEnabled) {
      const visibleServicesPublicIds = extractBookableServices(state.selectedServices, state.serviceGroups);
      return getFilteredVisibleServices(state, visibleServicesPublicIds);
    } else {
      return getFilteredServices(state);
    }
  }
);

const getServicesSearchText = createSelector(
  getServiceState,
  (state: IServiceState) => state.searchText
);

function getFilteredServices(state): IService[] {
  return state.searchText === ''
  ? state.services
  : state.services.filter(
      (service: IService) => service.name.toLowerCase()
                    .indexOf(state.searchText.toLowerCase()) !== -1
    );
}

function getFilteredVisibleServices(
  state: IServiceState,
  visibleServicesPublicIds: Array<string>
) {
  return state.searchText === ''
          ? state.services.filter(
              (service: IService) => visibleServicesPublicIds.includes(service.publicId)
            )
          : state.services.filter(
            (service: IService) => visibleServicesPublicIds.includes(service.publicId)
              && service.name.toLowerCase().indexOf(state.searchText.toLowerCase()) !== -1
            );
}

function extractBookableServices(
  selectedServices: IService[],
  serviceGroups: IServiceGroup[]
) {
  const tmp = [];
  serviceGroups.forEach(
    (serviceGroup: IServiceGroup) => {
      serviceGroup.serviceGroups.forEach(
        (serviceGroupList: IServiceGroupList) => {
          serviceGroupList.services.forEach(
            (service: IService) => {
              selectedServices.forEach(
                (selectedService: IService) => {
                  if (service.publicId === selectedService.publicId) {
                    const selectableServices = serviceGroupList.services.reduce(
                      (acc: any, curr: IService) => {
                        const hasPublicId = acc.indexOf(curr.publicId);
                        if (hasPublicId === -1) {
                          acc.push(curr.publicId);
                        }
                        return acc;
                      }, []);

                    tmp.push(...selectableServices);
                  }
                }
              );
            }
          );
        }
      );
    }
  );
  return tmp;
}

@Injectable()
export class ServiceSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  services$ = this.store.select(getAllServices);
  selectedServices$ = this.store.select(getSelectedServices);
  visibleServices$ = this.store.select(getVisibleServices);
  searchText$ = this.store.select(getServicesSearchText);
}

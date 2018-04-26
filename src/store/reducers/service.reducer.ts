import { IService } from '../../models/IService';
import * as ServiceActions from '../actions';
import { IServiceGroup } from '../../models/IServiceGroup';

export interface IServiceState {
  services: IService[];
  serviceGroups: IServiceGroup[];
  selectedServices: IService[];
  searchText: string;
  loading: boolean;
  loaded: boolean;
  error: Object;
}

export const initialState: IServiceState = {
  services: [],
  serviceGroups: [],
  selectedServices: [],
  searchText: '',
  loading: false,
  loaded: false,
  error: null
};

export function reducer (
  state: IServiceState = initialState,
  action: ServiceActions.AllServiceActions
): IServiceState {
  switch (action.type) {
    case ServiceActions.FETCH_SERVICES: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case ServiceActions.FETCH_SERVICES_SUCCESS: {
      return {
        ...state,
        services: action.payload.serviceList,
        loading: false,
        loaded: true,
        error: null
      };
    }
    case ServiceActions.FETCH_SERVICES_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case ServiceActions.FETCH_SERVICE_GROUPS: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case ServiceActions.FETCH_SERVICE_GROUPS_SUCCESS: {
      return {
        ...state,
        serviceGroups: action.payload,
        loading: false,
        loaded: true,
        error: null
      };
    }
    case ServiceActions.FETCH_SERVICE_GROUPS_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case ServiceActions.SELECT_SERVICE: {
      return {
        ...state,
        selectedServices: [
          ...state.selectedServices,
          action.payload
        ]
      };
    }
    case ServiceActions.DESELECT_SERVICE: {
      return {
        ...state,
        selectedServices: state.selectedServices.filter(
          (service: IService) =>
            service.publicId !== action.payload.publicId
        )
      };
    }
    case ServiceActions.FILTER_SERVICES: {
      return {
        ...state,
        searchText: action.payload
      };
    }
    case ServiceActions.RESET_FILTER_SERVICES: {
      return {
        ...state,
        searchText: ''
      };
    }
    default: {
        return state;
    }
  }
}


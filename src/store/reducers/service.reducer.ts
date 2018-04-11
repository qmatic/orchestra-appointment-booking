import { IService } from '../../models/IService';
import * as ServiceActions from '../actions';

export interface IServiceState {
  services: IService[];
  selectedServices: IService[];
  filteredServices: IService[];
  searchText: string;
  loading: boolean;
  loaded: boolean;
  error: Object;
}

export const initialState: IServiceState = {
  services: [],
  selectedServices: [],
  filteredServices: [],
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
        services: action.payload.serviceList
        ,
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
    default: {
        return state;
    }
  }
}

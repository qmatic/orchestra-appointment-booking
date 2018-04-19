import { IBranch } from '../../models/IBranch';
import * as BranchActions from '../actions';

export interface IBranchState {
  branches: IBranch[];
  selectedBranch: IBranch[];
  filteredBranches: IBranch[];
  searchText: string;
  loading: boolean;
  loaded: boolean;
  error: Object;
}

export const initialState: IBranchState = {
  branches: [],
  selectedBranch: [],
  filteredBranches: [],
  searchText: '',
  loading: false,
  loaded: false,
  error: null
};

export function reducer (
  state: IBranchState = initialState,
  action: BranchActions.AllBranchActions
): IBranchState {
  switch (action.type) {
    case BranchActions.FETCH_BRANCHES: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case BranchActions.SELECT_BRANCH: {
      return {
        ...state,
        selectedBranch: action.payload
      };
    }
    case BranchActions.FETCH_BRANCHES_SUCCESS: {
      return {
        ...state,
        branches: action.payload.branchList
        ,
        loading: false,
        loaded: true,
        error: null
      };
    }

    case BranchActions.FETCH_BRANCHES_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case BranchActions.FILTER_BRANCH_LIST: {

      return {
        ...state,
        searchText:  action.payload
      };
    }
    default: {
        return state;
    }
  }
}

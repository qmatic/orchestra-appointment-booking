import { IBranch } from '../../models/IBranch';
import * as BranchActions from '../actions';

export interface IBranchState {
  branches: IBranch[];
  selectedBranch: IBranch[];
  searchText: string;
  loading: boolean;
  loaded: boolean;
  error: Object;
}

export const initialState: IBranchState = {
  branches: [],
  selectedBranch: [],
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
    case BranchActions.FETCH_BRANCHES_SUCCESS: {
      return {
        ...state,
        branches: sortBranches(action.payload.branchList),
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
    case BranchActions.SELECT_BRANCH: {
      return {
        ...state,
        selectedBranch: [action.payload]
      };
    }
    case BranchActions.DESELECT_BRANCH: {
      return {
        ...state,
        selectedBranch: []
      };
    }
    case BranchActions.FILTER_BRANCHES: {
      return {
        ...state,
        searchText: action.payload
      };
    }
    case BranchActions.RESET_FILTER_BRANCHES: {
      return {
        ...state,
        searchText: ''
      };
    }
    case BranchActions.LOAD_SELECTED_BRANCH: {
      return {
        ...state,
        selectedBranch: [action.payload]
      };
    }
    default: {
      return state;
    }
  }
}

/**
 * Sort branches alphabetically
 * @param branchList - Fetched branch list
 */
function sortBranches(branchList: IBranch[]): IBranch[] {
  return branchList.slice().sort(
    (branch1: IBranch, branch2: IBranch) => {
      if (branch1.name.toLowerCase() < branch2.name.toLowerCase() ) { return -1; }
      if (branch1.name.toLowerCase() > branch2.name.toLowerCase() ) { return 1; }
      return 0;
    }
  );
}

import { FILTER_BRANCH_LIST } from './../actions/branch-list.actions';
import { IBranch, BRANCHES_DATA } from './../../models/IBranch';
import { Action } from '@ngrx/store';


export function branchReducer(state: any = { branchList : BRANCHES_DATA, filteredBranchList: BRANCHES_DATA }, action) {
  switch (action.type) {
    case FILTER_BRANCH_LIST:
        return Object.assign({}, state, { 
            searchText:  action.payload,
            filteredBranchList : state.branchList.filter(x => x.name && x.name.toLowerCase().indexOf(action.payload.toLowerCase()) != -1)
        });
    default:
        return state;
    }
}
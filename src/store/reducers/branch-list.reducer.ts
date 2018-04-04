import { FILTER_BRANCH_LIST } from './../actions/branch-list.actions';
import { IBranch, BRANCHES_DATA } from './../../models/IBranch';
import { Action } from '@ngrx/store';


export function branchListReducer(state: any = { branchList : BRANCHES_DATA, filteredBranchList: BRANCHES_DATA }, action) {
  switch (action.type) {
    case FILTER_BRANCH_LIST:
        console.log('filter branches');
        return Object.assign({}, state, { 
            searchText:  action.payload,
            filteredBranchList : state.branchList.filter(x => x.name && x.name.indexOf(action.payload) != -1)
        });
    default:
        return state;
    }
}
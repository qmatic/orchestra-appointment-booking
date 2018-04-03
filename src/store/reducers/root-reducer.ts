import { UserReducer } from './user-reducer';
import { IAppState } from './../../models/IAppState';
import { branchListReducer } from './branch-list.reducer';

export default {
    branchList: branchListReducer,
 	user: UserReducer
 };

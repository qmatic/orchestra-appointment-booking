import { SystemInfoReducer } from './system-info.reducer';
import { UserReducer } from './user-reducer';
import { IAppState } from './../../models/IAppState';
import { branchReducer } from './branch.reducer';

export default {
    branchList: branchReducer,
 	user: UserReducer,
    systemInfo: SystemInfoReducer
 };

import { IUserState } from './../store/reducers/user-reducer';
import { IBranch } from './IBranch';

export interface IAppState {
    readonly user: IUserState,
    readonly branchList: IBranch[];
    readonly filteredBranchList: IBranch[];
}
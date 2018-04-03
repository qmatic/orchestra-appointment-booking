import { IBranch } from './IBranch';
import { IUser } from './IUser';
export interface IAppState {
    readonly user: IUser,
    readonly branchList: IBranch[];
    readonly filteredBranchList: IBranch[];
}
import { IServiceGroupList } from './IServiceGroupList';

export interface IServiceGroup {
  branchPublicId: string;
  branchName: string;
  serviceGroups: IServiceGroupList[];
}

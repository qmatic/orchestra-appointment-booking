import { IService } from './IService';
import { IBranch } from './IBranch';

export interface IBookingInformation {
  branchPublicId: string;
  serviceQuery?: string;
  numberOfCustomers?: number;
  date?: string;
  time?: string;
}

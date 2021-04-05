import { ICustomer } from './ICustomer';
import { IBranch } from './IBranch';
import { IService } from './IService';
import { IResource } from './IResource';
import { IActionAppointment } from './IActionAppointment';

export interface IAppointment {
  publicId?: string;
  status?: number;
  created?: number;
  updated?: number;
  start?: string;
  numberOfCustomers?: number;
  custom?: string;
  customers?: ICustomer[];
  branch?: IBranch;
  services?: IService[];
  title?: string;
  notes?: string;
  allDay?: boolean;
  blocking?: boolean;
  end?: string;
  resource?: IResource;
  deleted?: boolean;
  qpId?: number;
  id?: string;
  invokeStatEvent?: boolean;
  externalNotes?: string;
  entityId?: string;
  operation?: string;
  username?: string;
  change?: any;
  branchId?: number;
  timeStamp?: string;
}

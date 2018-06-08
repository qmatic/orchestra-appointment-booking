import { ICustomer } from './ICustomer';
import { IBranch } from './IBranch';
import { IService } from './IService';
import { IResource } from './IResource';

export interface IAppointment {
  publicId?: string;
  status?: number;
  created?: number;
  updated?: number;
  start?: string;
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
}

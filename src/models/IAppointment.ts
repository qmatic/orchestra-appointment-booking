import { ICustomer } from './ICustomer';
import { IBranch } from './IBranch';
import { IService } from './IService';
import { IAppointmentCustomFields } from './IAppointmentCustomFields';

export interface IAppointment {
  publicId: string;
  status: number;
  created: number;
  updated: number;
  start: string;
  custom: IAppointmentCustomFields;
  customers: ICustomer[];
  branch: IBranch;
  services: IService[];
  title: string;
  notes: string;
  allDay: boolean;
  blocking: boolean;
  end: string;
}

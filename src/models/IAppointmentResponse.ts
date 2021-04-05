import { IAppointment } from './IAppointment';

export interface IAppointmentResponse {
  appointmentList?: IAppointment[];
  appointmentActions?: IAppointment[];
}

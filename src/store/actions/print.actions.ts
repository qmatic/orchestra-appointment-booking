import { IAppointment } from './../../models/IAppointment';
import { Action } from '@ngrx/store';

// appointment to be printed
export const PRINT_APPOINTMENT = '[Print] PRINT_APPOINTMENT';


export class PrintAppointment implements Action {
  readonly type = PRINT_APPOINTMENT;
  constructor(public payload: IAppointment) {}
}

// Action types
export type AllPrintActions =  | PrintAppointment;

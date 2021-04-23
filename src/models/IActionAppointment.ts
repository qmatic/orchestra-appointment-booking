export interface IActionAppointment {
  before?: IActionAllAppointment;
  after?: IActionAllAppointment;
}

export interface IActionAllAppointment {
  start?: number;
  end?: number;
  notes?: string;
  title?: string;
  services?: string[];
  resource?: string;
  custom?: IActionCustomAppointment;
}

export interface IActionCustomAppointment {
  appId?: number;
  phoneNumber?: string;
  notificationType?: string;
}



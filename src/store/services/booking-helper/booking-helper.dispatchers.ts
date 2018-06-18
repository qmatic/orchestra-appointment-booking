import { Injectable } from '@angular/core';

import { AppointmentMetaDispatchers } from '../appointment-meta';
import { CustomerDispatchers } from '../customer';
import { AppointmentDispatchers } from '../appointment';
import { ServiceDispatchers } from '../service';

@Injectable()
export class BookingHelperDispatchers {
  constructor(
    private appointmentMetaDispatchers: AppointmentMetaDispatchers,
    private appointmentDispatchers: AppointmentDispatchers,
    private customerDispatchers: CustomerDispatchers,
    private serviceDispatchers: ServiceDispatchers
  ) {}

  resetAll() {
    this.appointmentMetaDispatchers.resetAllAppointmentMeta();
    this.customerDispatchers.resetCurrentCustomer();
    this.appointmentDispatchers.resetAppointment();
    this.serviceDispatchers.deselectServices();
  }
}

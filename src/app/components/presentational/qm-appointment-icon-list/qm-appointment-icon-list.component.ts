import { Component, Input } from '@angular/core';
import { IAppointment } from '../../../../models/IAppointment';

@Component({
  selector: 'qm-appointment-icon-list',
  templateUrl: './qm-appointment-icon-list.component.html',
  styleUrls: ['./qm-appointment-icon-list.component.scss']
})
export class QmAppointmentIconListComponent {
  @Input() appointment: IAppointment;

  @Input() userDirection: string;

  constructor() {}

  getAdditionalServices(appointment) {
    return (
      appointment.services &&
      appointment.services
        .slice(0)
        .map(function(service) {
          return service.name;
        })
        .slice(1)
        .join(', ')
    );
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { ICustomer } from '../../../../models/ICustomer';
import { CustomerDispatchers, AppointmentDispatchers } from '../../../../store';

@Component({
  selector: 'qm-customer-card',
  templateUrl: './qm-customer-card.component.html',
  styleUrls: ['./qm-customer-card.component.scss']
})
export class QmCustomerCardComponent implements OnInit {
  @Input() customer: ICustomer;

  constructor(
    private customerDispatchers: CustomerDispatchers,
    private appointmentDispatchers: AppointmentDispatchers
  ) { }

  ngOnInit() {
  }

  resetCurrentCustomer () {
    this.customerDispatchers.resetCurrentCustomer();
    this.appointmentDispatchers.resetAppointments();
  }
}

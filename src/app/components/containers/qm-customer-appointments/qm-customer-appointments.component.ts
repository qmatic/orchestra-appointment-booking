import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import {
  AppointmentSelectors,
  AppointmentDispatchers,
  CustomerSelectors
} from '../../../../store';

import { IAppointment } from '../../../../models/IAppointment';
import { ICustomer } from '../../../../models/ICustomer';

@Component({
  selector: 'qm-customer-appointments',
  templateUrl: './qm-customer-appointments.component.html',
  styleUrls: ['./qm-customer-appointments.component.scss']
})
export class QmCustomerAppointmentsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private appointments$: Observable<IAppointment[]>;
  private currentCustomer$: Observable<ICustomer>;
  private appointmentsLoaded$: Observable<boolean>;
  private appointments: IAppointment[];
  private currentCustomer: ICustomer;
  private appointmentsLoaded: boolean;

  constructor(
    private appointmentSelectors: AppointmentSelectors,
    private customerSelectors: CustomerSelectors,
    private appointmentDispatchers: AppointmentDispatchers
  ) {
    this.appointments$ = this.appointmentSelectors.appointments$;
    this.appointmentsLoaded$ = this.appointmentSelectors.appointmentsLoaded$;
    this.currentCustomer$ = this.customerSelectors.currentCustomer$;
  }

  ngOnInit() {
    const appointmentsSubcription = this.appointments$.subscribe(
      (appointments: IAppointment[]) =>
        this.appointments = [...appointments].sort(this.sortDate)
    );

    const appointmentsLoadedSubcription = this.appointmentsLoaded$.subscribe(
      (appointmentsLoaded: boolean) =>
        this.appointmentsLoaded = appointmentsLoaded
    );

    const customerSubcription = this.currentCustomer$.subscribe(
      (currentCustomer: ICustomer) => this.currentCustomer = currentCustomer
    );

    this.subscriptions.add(appointmentsSubcription);
    this.subscriptions.add(appointmentsLoadedSubcription);
    this.subscriptions.add(customerSubcription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  sortDate(appointment1: IAppointment, appointment2: IAppointment) {
    const date1 = new Date(appointment1.start);
    const date2 = new Date(appointment2.start);

    if (date1 > date2) { return 1; }
    if (date1 < date2) { return -1; }
    return 0;
  }

  fetchAppointments(): void {
    this.appointmentDispatchers.fetchAppointments(this.currentCustomer.publicId);
  }
}

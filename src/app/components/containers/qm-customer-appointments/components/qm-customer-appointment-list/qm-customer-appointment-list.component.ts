import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { IAppointment } from '../../../../../../models/IAppointment';
import { UserSelectors, AppointmentDispatchers } from '../../../../../../store';


@Component({
  selector: 'qm-customer-appointment-list',
  templateUrl: './qm-customer-appointment-list.component.html',
  styleUrls: ['./qm-customer-appointment-list.component.scss']
})
export class QmCustomerAppointmentListComponent implements OnInit, OnDestroy {
  @Input() appointments: IAppointment[];
  private subscriptions: Subscription = new Subscription();
  private userLocale$: Observable<string>;
  private userLocale: string;

  constructor(
    private userSelectors: UserSelectors,
    private appointmentDispatchers: AppointmentDispatchers
  ) {
    this.userLocale$ = this.userSelectors.userLocale$;
  }

  ngOnInit() {
    const userLocalSubscription = this.userLocale$.subscribe(
      (userLocale: string) => this.userLocale = userLocale
    );
    this.subscriptions.add(userLocalSubscription);
  }

  deleteAppointment(appointment: IAppointment): void {
    this.appointmentDispatchers.deleteAppointment(appointment);
  }

  getStatusClass(appointment: IAppointment) {
    switch (appointment.status) {
      case 20: {
        return 'created';
      }
      default: {
        return '';
      }
    }
  }

  getStatusLabel(status: number): string {
    switch (status) {
      case 0:
          return 'label.appointment.states.created';
      case 10:
          return 'label.appointment.states.reserved';
      case 20:
          return 'label.appointment.states.created';
      case 30:
          return 'label.appointment.states.arrived';
      case 40:
          return 'label.appointment.states.called';
      case 50:
          return 'label.appointment.states.completed';
      case 51:
          return 'label.appointment.states.noshow';
      case 52:
          return 'label.appointment.states.deletedByReset';
      case 53:
          return 'label.appointment.states.cancelled';
      default:
          return '';
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

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

  displayStatus(appointment: IAppointment) {
    switch (appointment.status) {
      case 20: // Created
      case 21: { // Rescheduled
        const now = new Date();
        const appointmentStart = new Date(appointment.start);
        return appointmentStart < now; // if appointment start date in the past display Done status
      }
      case 30: // Arrived
      case 40: // Called
      case 50: // Completed
      case 51: // No show
      case 52: // Ended by reset
      case 53: // Cancelled
      case 54: { // Never arrived
        return true;
      }
      default: {
        return false;
      }
    }
  }

  getStatusClass(appointment: IAppointment) {
    switch (appointment.status) {
      // Created or rescheduled
      case 20:
      case 21:
      // Arrived, called, completed or cancelled
      case 30:
      case 40:
      case 50:
      case 53: {
        return 'success';
      }
      default: {
        return '';
      }
    }
  }

  getStatusLabel(appointment: IAppointment): string {
    switch (appointment.status) {
      // Created or rescheduled
      case 20:
      case 21:
      // Arrived, called, completed or cancelled
      case 30:
      case 40:
      case 50:
      case 53: {
        return 'label.appointment.states.done';
      }
      // No show, ended by reset or never arrived
      case 51:
      case 52:
      case 54: {
        return 'label.appointment.states.missed';
      }
      default: {
        return '';
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

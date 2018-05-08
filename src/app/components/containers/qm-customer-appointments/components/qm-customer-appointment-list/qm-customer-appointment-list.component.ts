import { Setting } from './../../../../../../models/Setting';
import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { IAppointment } from '../../../../../../models/IAppointment';
import {
  UserSelectors,
  AppointmentDispatchers,
  SettingsAdminSelectors
} from '../../../../../../store';

@Component({
  selector: 'qm-customer-appointment-list',
  templateUrl: './qm-customer-appointment-list.component.html',
  styleUrls: ['./qm-customer-appointment-list.component.scss']
})
export class QmCustomerAppointmentListComponent
  implements OnInit, OnDestroy, AfterViewInit {
  @Input() appointments: IAppointment[];
  private subscriptions: Subscription = new Subscription();
  private userLocale$: Observable<string>;
  private userLocale: string;
  private settingsMap$: Observable<{ [name: string]: Setting }>;
  private isMilitaryTime: boolean;
  private idClosestToCurretTime: string;
  userDirection$: Observable<string>;

  constructor(
    private userSelectors: UserSelectors,
    private appointmentDispatchers: AppointmentDispatchers,
    private settingsAdminSelectors: SettingsAdminSelectors
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.userLocale$ = this.userSelectors.userLocale$;
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
  }

  ngOnInit() {
    this.updateScrollToStatusOnAppointments();

    const settingsSubscription = this.settingsMap$.subscribe(
      (settingsMap: { [name: string]: Setting }) => {
        this.isMilitaryTime = settingsMap['TimeFormat'].value !== 'AMPM';
      }
    );

    const userLocalSubscription = this.userLocale$.subscribe(
      (userLocale: string) => {
        this.userLocale = userLocale;
      }
    );

    this.subscriptions.add(userLocalSubscription);
    this.subscriptions.add(settingsSubscription);
  }

  updateScrollToStatusOnAppointments(): void {
    const now = Math.round(new Date().getTime() / 1000);
    let proximity = Number.MAX_SAFE_INTEGER;

    this.appointments.forEach(appointment => {
      const appointmentStart = Math.round(
        new Date(appointment.start).getTime() / 1000
      );
      const newProximity = Math.abs(appointmentStart - now);
      if (newProximity < proximity) {
        proximity = newProximity;
        this.idClosestToCurretTime = appointment.publicId;
      }
    });
  }

  ngAfterViewInit(): void {
    window.location.hash = this.idClosestToCurretTime.slice(0, 7);
  }

  deleteAppointment(appointment: IAppointment): void {
    this.appointmentDispatchers.deleteAppointment(appointment);
  }

  displayStatus(appointment: IAppointment) {
    switch (appointment.status) {
      case 20: // Created
      case 21: {
        // Rescheduled
        // if appointment start date in the past display Done status
        const now = new Date();
        const appointmentStart = new Date(appointment.start);
        return appointmentStart < now
          ? {
              showStatus: true,
              showPrint: true,
              showEdit: false,
              showCancel: false
            }
          : {
              showStatus: false,
              showPrint: true,
              showEdit: true,
              showCancel: true
            };
      }
      case 30: // Arrived
      case 40: // Called
      case 50: // Completed
      case 51: // No show
      case 52: // Ended by reset
      case 53: // Cancelled
      case 54: {
        // Never arrived
        return {
          showStatus: true,
          showPrint: true,
          showEdit: false,
          showCancel: false
        };
      }
      default: {
        return {
          showStatus: false,
          showPrint: true,
          showEdit: false,
          showCancel: false
        };
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
    window.location.hash = '';
    this.subscriptions.unsubscribe();
  }
}

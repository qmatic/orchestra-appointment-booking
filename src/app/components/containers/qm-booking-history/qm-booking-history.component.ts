import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable ,  Subscription } from 'rxjs';
import * as moment from 'moment';

import { NavigationService } from './../../../util/navigation.service';
import { IAppointment } from './../../../../models/IAppointment';
import { ICustomer } from '../../../../models/ICustomer';
import {
  CustomerDispatchers,
  AppointmentDispatchers,
  UserSelectors,
  PrintDispatchers,
  SystemInfoSelectors,
  SettingsAdminSelectors,
  AppointmentSelectors
} from '../../../../store';
import { QmModalService } from '../../presentational/qm-modal/qm-modal.service';
import { Setting } from '../../../../models/Setting';

@Component({
  selector: 'qm-booking-history',
  templateUrl: './qm-booking-history.component.html',
  styleUrls: ['./qm-booking-history.component.scss']
})
export class QmBookingHistoryComponent implements OnInit, OnDestroy {
  @Input() bookingHistory: IAppointment[];
  private subscriptions: Subscription = new Subscription();
  public userDirection$: Observable<string>;
  private timeConvention$: Observable<string>;
  private dateConvention$: Observable<string>;
  public isMilitaryTime: boolean;
  private settingsMap$: Observable<{ [name: string]: Setting }>;
  private getEmailTemplateEnabled: boolean;
  private qpAppointment: IAppointment;
  public dateFormat = 'dddd MMMM DD YYYY';

  constructor(
    private customerDispatchers: CustomerDispatchers,
    private appointmentDispatchers: AppointmentDispatchers,
    private userSelectors: UserSelectors,
    private modalService: QmModalService,
    private navigationService: NavigationService,
    private printDispatchers: PrintDispatchers,
    private systemInfoSelectors: SystemInfoSelectors,
    private settingsAdminSelectors: SettingsAdminSelectors,
    private appointmentSelectors: AppointmentSelectors,
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.timeConvention$ = this.systemInfoSelectors.systemInfoTimeConvention$;
    this.dateConvention$ = this.systemInfoSelectors.systemInfoDateConvention$;
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
  }

  ngOnInit() {
    const systemInformationSubscription = this.timeConvention$.subscribe(
      timeConvention => this.isMilitaryTime = timeConvention !== 'AMPM'
    );

    this.subscriptions.add(systemInformationSubscription);

    const settingsMapSubscription = this.settingsMap$.subscribe(
      (settingsMap: {[name: string]: Setting }) => {
        this.getEmailTemplateEnabled = settingsMap.ShowEmailTemplate.value;
      }
    );
    this.subscriptions.add(settingsMapSubscription);

    const qpAppointmentSubscription = this.appointmentSelectors.qpAppointment$.subscribe(appointment => {
      this.qpAppointment = appointment;
    });
    this.subscriptions.add(qpAppointmentSubscription);

    const dateConventionSubscription = this.dateConvention$.subscribe(
      (dateConvention: string) => {
        this.dateFormat = dateConvention || 'dddd MMMM DD YYYY';
      }
    );
    this.subscriptions.add(dateConventionSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  handleCustomerClick($event: Event, customer: ICustomer) {
    $event.preventDefault();
    this.customerDispatchers.selectCustomer(customer);
  }

  handleEdit(appointment: IAppointment) {
    this.appointmentDispatchers.selectAppointment(appointment);
  }

  handleDelete(appointment: IAppointment) {
    this.modalService.openForTransKeys(
      'modal.cancel.booking.message',
      '',
      'modal.cancel.booking.no',
      'modal.cancel.booking.ok',
      (isCancelled: boolean) => {
        if (!isCancelled) {
          this.appointmentDispatchers.deleteAppointment(appointment);
        }
      },
      () => {},
      {
        date: moment(appointment.start).format('DD MMM YYYY')
      }
    );
  }

  getTimezoneOffset(appointment: IAppointment) {
    return moment()
      .tz(appointment.branch.fullTimeZone)
      .format('Z');
  }

  printAppointment(appointment: IAppointment) {
    if (this.getEmailTemplateEnabled && (!this.qpAppointment ||
      ((this.qpAppointment && this.qpAppointment.publicId !== appointment.publicId)))) {
      this.appointmentDispatchers.fetchAppointmentQP(appointment.publicId);
    }
    this.printDispatchers.setPrintedAppointment(appointment);
    this.navigationService.goToPrintConfirmPage();
  }
}

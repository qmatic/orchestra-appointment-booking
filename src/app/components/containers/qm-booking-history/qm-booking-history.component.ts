import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

import { NavigationService } from './../../../util/navigation.service';
import { IAppointment } from './../../../../models/IAppointment';
import { ICustomer } from '../../../../models/ICustomer';
import {
  CustomerDispatchers,
  AppointmentDispatchers,
  UserSelectors,
  PrintDispatchers,
  SystemInfoSelectors
} from '../../../../store';
import { QmModalService } from '../../presentational/qm-modal/qm-modal.service';

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
  public isMilitaryTime: boolean;

  constructor(
    private customerDispatchers: CustomerDispatchers,
    private appointmentDispatchers: AppointmentDispatchers,
    private userSelectors: UserSelectors,
    private modalService: QmModalService,
    private navigationService: NavigationService,
    private printDispatchers: PrintDispatchers,
    private systemInfoSelectors: SystemInfoSelectors
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.timeConvention$ = this.systemInfoSelectors.systemInfoTimeConvention$;
  }

  ngOnInit() {
    const systemInformationSubscription = this.timeConvention$.subscribe(
      timeConvention => this.isMilitaryTime = timeConvention !== 'AMPM'
    );

    this.subscriptions.add(systemInformationSubscription);
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
    this.printDispatchers.setPrintedAppointment(appointment);
    this.navigationService.goToPrintConfirmPage();
  }
}

import { element } from 'protractor';
import { IAppointment } from './../../../../../../models/IAppointment';
import { QmModalService } from './../../../../presentational/qm-modal/qm-modal.service';
import { Setting } from './../../../../../../models/Setting';
import * as moment from 'moment';
import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import {
  UserSelectors,
  AppointmentDispatchers,
  SettingsAdminSelectors,
  BookingHelperSelectors
} from '../../../../../../store';
import { BookingHelperService } from '../../../../../../services/util/bookingHelper.service';

interface IAppointmentScroll extends IAppointment {
  scrollTo: boolean;
}

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
  public isMilitaryTime: boolean;
  private bookingStarted$: Observable<boolean>;
  private userDirection$: Observable<string>;
  public userDirection: string;
  private settingsMap: { [name: string ]: Setting };
  @ViewChildren('customCard') customCards;

  constructor(
    private userSelectors: UserSelectors,
    private appointmentDispatchers: AppointmentDispatchers,
    private settingsAdminSelectors: SettingsAdminSelectors,
    private bookingHelperSelectors: BookingHelperSelectors,
    private modalService: QmModalService,
    private translate: TranslateService,
    private router: Router,
    private bookingHelperService: BookingHelperService
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.userLocale$ = this.userSelectors.userLocale$;
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
    this.bookingStarted$ = this.bookingHelperSelectors.bookingStarted$;
  }

  ngOnInit() {
    const settingsSubscription = this.settingsMap$.subscribe(
      (settingsMap: { [name: string]: Setting }) => {
        this.isMilitaryTime = settingsMap['TimeFormat'].value !== 'AMPM';
        this.settingsMap = settingsMap;
      }
    );

    const userDirectionSubscription = this.userDirection$.subscribe(
      (userDirection: string) => {
        this.userDirection = userDirection;
      }
    );

    const userLocalSubscription = this.userLocale$.subscribe(
      (userLocale: string) => {
        this.userLocale = userLocale;
      }
    );

    this.subscriptions.add(userLocalSubscription);
    this.subscriptions.add(userDirectionSubscription);
    this.subscriptions.add(settingsSubscription);

    this.updateAppointmentList();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.customCards.toArray().forEach((elem: ElementRef, index: number) => {
        // if (elem.nativeElement.getAttribute('data-scroll-to') === 'true') {
        //   elem.nativeElement.scrollIntoView(true);
        // }
        if ((this.appointments[index] as IAppointmentScroll).scrollTo) {
          elem.nativeElement.scrollIntoView(true);
        }
      });
    });
  }

  updateAppointmentList() {
    this.appointments.map((appointment: IAppointmentScroll) => {
      appointment.scrollTo = this.isNextAppointment(appointment);
    });
  }

  getTimezoneOffset(appointment: IAppointment) {
    return moment()
      .tz(appointment.branch.fullTimeZone)
      .format('Z');
  }

  resourceEnabled(): boolean {
    return this.settingsMap.ShowResource.value;
  }

  getResource(appointment: IAppointment) {
    const resourceIsEnabled = this.resourceEnabled();
    if (resourceIsEnabled) {
      return appointment.resource && appointment.resource.name ? appointment.resource.name : '';
    } else {
      return '';
    }
  }

  isNextAppointment(listAppointment: IAppointment) {
    const now = Math.round(new Date().getTime() / 1000);
    let proximity = Number.MAX_SAFE_INTEGER;
    let closestAppointment: IAppointment = null;

    if (this.appointments) {
      this.appointments.forEach(appointment => {
        const appointmentStart = Math.round(
          moment(appointment.start).valueOf() / 1000
        );
        const newProximity = Math.abs(appointmentStart - now);
        if (newProximity < proximity) {
          proximity = newProximity;
          closestAppointment = appointment;
        }
      });
      return (
        closestAppointment &&
        closestAppointment.publicId === listAppointment.publicId
      );
    } else {
      return false;
    }
  }

  deleteAppointment(appointment: IAppointment): void {
    this.modalService.openForTransKeys(
      'modal.cancel.booking.message',
      '',
      'modal.cancel.booking.cancel',
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

  rescheduleClicked(appointment) {
    const displayStatus = this.displayStatus(appointment);
    const editAvailable = displayStatus.showEdit;

    if (editAvailable === true) {
      const isBookingStarted = this.bookingHelperService.getIsBookingStarted();

      if (isBookingStarted) {
        const transSubscription = this.modalService.openForTransKeys(
          'label.modal.reschedule',
          'label.modal.prevent.reschedule',
          'button.yes',
          'button.no',
          result => {
            this.appointmentDispatchers.selectAppointment(appointment);
          },
          err => {
            console.log(err);
          }
        );
        this.subscriptions.add(transSubscription);
      } else {
        // NEXT : CALL FUNCTION TO RESHEDULE WITH APPOINTMENT
        this.appointmentDispatchers.selectAppointment(appointment);
      }
    }
  }

  ngOnDestroy() {
    // window.location.hash = '';
    this.subscriptions.unsubscribe();
  }
}

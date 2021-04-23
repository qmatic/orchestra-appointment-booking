import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  AfterViewInit,
  ViewChildren,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { Subscription, Observable } from 'rxjs';
import * as moment from 'moment';
import { tz } from 'moment-timezone';

import { NavigationService } from './../../../../../util/navigation.service';
import { IAppointment } from './../../../../../../models/IAppointment';
import { QmModalService } from './../../../../presentational/qm-modal/qm-modal.service';
import { Setting } from './../../../../../../models/Setting';

import {
  UserSelectors,
  AppointmentDispatchers,
  SettingsAdminSelectors,
  SystemInfoSelectors,
  AppointmentSelectors
} from '../../../../../../store';

import { BookingHelperService } from '../../../../../../services/util/bookingHelper.service';
import { PrintDispatchers } from '../../../../../../store/services/print/index';

interface IAppointmentScroll extends IAppointment {
  scrollTo: boolean;
}

@Component({
  selector: 'qm-customer-appointment-list',
  templateUrl: './qm-customer-appointment-list.component.html',
  styleUrls: ['./qm-customer-appointment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QmCustomerAppointmentListComponent
  implements OnInit, OnDestroy, AfterViewInit {
  @Input() appointments: IAppointment[];
  private subscriptions: Subscription = new Subscription();
  private timeConvention$: Observable<string>;
  private dateConvention$: Observable<string>;
  private settingsMap$: Observable<{ [name: string]: Setting }>;
  public isMilitaryTime: boolean;
  private userDirection$: Observable<string>;
  private getEmailTemplateEnabled: boolean;
  public userDirection: string;
  private settingsMap: { [name: string]: Setting };
  public resendConfirmatonEnabled: boolean;
  public resentAppointmentId: string;
  public appointmentLoading = false;
  public appointmentLoaded = false;
  public dateFormat = 'dddd MMMM DD YYYY';
  public ModalDateFormat = 'DD MMM YYYY';
  private getDtFormatFromParams: boolean;

  @ViewChildren('customCard') customCards;

  constructor(
    private userSelectors: UserSelectors,
    private appointmentDispatchers: AppointmentDispatchers,
    private settingsAdminSelectors: SettingsAdminSelectors,
    private modalService: QmModalService,
    private bookingHelperService: BookingHelperService,
    private navigationService: NavigationService,
    private printDispatchers: PrintDispatchers,
    private systemInfoSelectors: SystemInfoSelectors,
    private appointmentSelectors: AppointmentSelectors,
    private cdr: ChangeDetectorRef
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
    this.timeConvention$ = this.systemInfoSelectors.systemInfoTimeConvention$;
    this.dateConvention$ = this.systemInfoSelectors.systemInfoDateConvention$;
  }

  ngOnInit() {
    const settingsSubscription = this.settingsMap$.subscribe(
      (settingsMap: { [name: string]: Setting }) => {
        this.settingsMap = settingsMap;
        this.getEmailTemplateEnabled = settingsMap.ShowEmailTemplate.value;
        this.resendConfirmatonEnabled = settingsMap.ResendConfirmation.value;
        this.getDtFormatFromParams = settingsMap.GetSystemParamsDateFormat.value;
      }
    );

    const ResentAppointmentIdSubscription = this.appointmentSelectors.resentAppointmentId$.subscribe(id => {
      this.resentAppointmentId = id;
    });

    const appointmentLoadingSubscription = this.appointmentSelectors.appointmentsLoading$.subscribe((state: boolean) => {
      setTimeout(() => {                           // <<<---using ()=> syntax
        this.appointmentLoading = state;
        this.cdr.detectChanges();
      }, 100);


    });


    const appointmentLoadedSubscription = this.appointmentSelectors.appointmentsLoading$.subscribe(state => {
      setTimeout(() => {
        this.appointmentLoaded = state;
        this.cdr.detectChanges();
      }, 100);
    });


    const userDirectionSubscription = this.userDirection$.subscribe(
      (userDirection: string) => {
        this.userDirection = userDirection;
      }
    );

    const timeConventionSubscription = this.timeConvention$.subscribe(
      timeConvention => this.isMilitaryTime = timeConvention !== 'AMPM'
    );

    const dateConventionSubscription = this.dateConvention$.subscribe(
      (dateConvention: string) => {
        this.dateFormat = this.getDtFormatFromParams ? (dateConvention || 'dddd MMMM DD YYYY') : 'dddd MMMM DD YYYY';
        this.ModalDateFormat = this.getDtFormatFromParams ? (dateConvention || 'DD MMM YYYY') : 'DD MMM YYYY';

      }
    );

    this.subscriptions.add(settingsSubscription);
    this.subscriptions.add(userDirectionSubscription);
    this.subscriptions.add(timeConventionSubscription);
    this.subscriptions.add(dateConventionSubscription);
    this.subscriptions.add(ResentAppointmentIdSubscription);
    this.subscriptions.add(appointmentLoadingSubscription);
    this.subscriptions.add(appointmentLoadedSubscription);

    this.updateAppointmentList();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.customCards.toArray().forEach((elem: ElementRef, index: number) => {
        if ((this.appointments[index] as IAppointmentScroll).scrollTo) {
          elem.nativeElement.scrollIntoView(true);
        }
      });
    });
  }

  updateAppointmentList() {
    this.appointments.map((appointment: IAppointmentScroll) => {
      appointment = { ...appointment, scrollTo: this.isNextAppointment(appointment) };
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
      'modal.cancel.booking.no',
      'modal.cancel.booking.ok',
      (isCancelled: boolean) => {
        if (!isCancelled) {
          this.appointmentDispatchers.deleteAppointment(appointment);
        }
      },
      () => { },
      {
        date: moment(appointment.start).format(this.ModalDateFormat)
      }
    );
  }

  displayStatus(appointment: IAppointment) {
    switch (appointment.status) {
      case 20: // Created
      case 21: {
        // Rescheduled
        // if appointment start date in the past display Done status
        const now = moment();
        const appointmentStart = moment(appointment.start);
        return appointmentStart < now
          ? {
            showStatus: true,
            showPrint: true,
            showEdit: false,
            showCancel: false,
            showResend: false
          }
          : {
            showStatus: false,
            showPrint: true,
            showEdit: true,
            showCancel: true,
            showResend: true
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
          showCancel: false,
          showResend: false
        };
      }
      default: {
        return {
          showStatus: false,
          showPrint: true,
          showEdit: false,
          showCancel: false,
          showResend: false
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

  isNotified(appointment) {
    if (appointment && JSON.parse(appointment.custom.toString()) && JSON.parse(appointment.custom.toString()).notificationType) {
      const notificationType = JSON.parse(appointment.custom.toString()).notificationType;
      if (notificationType === 'email' || notificationType === 'sms' || notificationType === 'both') {
        return true;
      }
      return false;
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
          () => {
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
    this.subscriptions.unsubscribe();
  }

  printAppointment(appointment: IAppointment) {
    if (this.getEmailTemplateEnabled) {
      this.appointmentDispatchers.fetchAppointmentQP(appointment.publicId);
    }
    this.printDispatchers.setPrintedAppointment(appointment);
    this.navigationService.goToPrintConfirmPage();
  }
  resendConfirmaton(appointment: IAppointment) {
    this.appointmentDispatchers.SetResendAppointmentId(appointment.publicId);
    this.appointmentDispatchers.resendAppointmentConfirmation(appointment);
  }
  // get appointmentLoadedState(){
  //   return this.appointmentLoading.toString()
  // }
}

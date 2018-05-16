import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { IAppointment } from '../../../../models/IAppointment';
import {
  ReserveSelectors,
  BookingDispatchers,
  CustomerSelectors,
  AppointmentMetaSelectors,
  BranchSelectors,
  DateSelectors,
  TimeslotSelectors,
  UserSelectors,
  SettingsAdminSelectors
} from '../../../../store';
import { IBookingInformation } from '../../../../models/IBookingInformation';
import { ICustomer } from '../../../../models/ICustomer';
import { IBranch } from '../../../../models/IBranch';
import { Setting } from '../../../../models/Setting';
import { ModalService } from '../../../../services/util/modal.service';

@Component({
  selector: 'qm-booking-footer',
  templateUrl: './qm-booking-footer.component.html',
  styleUrls: ['./qm-booking-footer.component.scss']
})
export class QmBookingFooterComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private reservedAppointment$: Observable<IAppointment>;
  private currentCustomer$: Observable<ICustomer>;
  private title$: Observable<string>;
  private notes$: Observable<string>;
  private selectedBranches$: Observable<IBranch[]>;
  private notificationType$: Observable<string>;
  private selectedDate$: Observable<string>;
  private selectedTime$: Observable<string>;
  public userDirection$: Observable<string>;
  private settingsMap$: Observable<{ [name: string]: Setting }>;

  private emailEnabled: boolean;
  private smsEnabled: boolean;
  private emailAndSmsEnabled: boolean;
  private noNotificationEnabled: boolean;
  private reservedAppointment: IAppointment;
  private selectedBranches: IBranch[];
  private selectedDate: string;
  private selectedTime: string;
  private currentCustomer: ICustomer;
  private notificationType: string;
  private title: string;
  private notes: string;

  constructor(
    private customerSelectors: CustomerSelectors,
    private reserveSelectors: ReserveSelectors,
    private bookingDispatchers: BookingDispatchers,
    private appointmentMetaSelectors: AppointmentMetaSelectors,
    private branchSelectors: BranchSelectors,
    private dateSelectors: DateSelectors,
    private timeslotSelectors: TimeslotSelectors,
    private userSelectors: UserSelectors,
    private settingsAdminSelectors: SettingsAdminSelectors,
    private modalService: ModalService
  ) {
    this.currentCustomer$ = this.customerSelectors.currentCustomer$;
    this.reservedAppointment$ = this.reserveSelectors.reservedAppointment$;
    this.selectedBranches$ = this.branchSelectors.selectedBranch$;
    this.selectedDate$ = this.dateSelectors.selectedDate$;
    this.selectedTime$ = this.timeslotSelectors.selectedTime$;
    this.title$ = this.appointmentMetaSelectors.title$;
    this.notes$ = this.appointmentMetaSelectors.notes$;
    this.notificationType$ = this.appointmentMetaSelectors.notificationType$;
    this.userDirection$ = this.userSelectors.userDirection$;
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
  }

  ngOnInit() {
    const titleSubscription = this.title$.subscribe(
      (title: string) => this.title = title
    );

    const notesSubscription = this.notes$.subscribe(
      (notes: string) => this.notes = notes
    );

    const notificationTypeSubscription = this.notificationType$.subscribe(
      (notificationType: string) => this.notificationType = notificationType
    );

    const selectedBranchSubscription = this.selectedBranches$.subscribe(
      (selectedBranches: IBranch[]) => this.selectedBranches = selectedBranches
    );

    const selectedDateSubscription = this.selectedDate$.subscribe(
      (selectedDate: string) => this.selectedDate = selectedDate
    );

    const selectedTimeSubscription = this.selectedTime$.subscribe(
      (selectedTime: string) => this.selectedTime = selectedTime
    );

    const reservedAppointmentSubscription = this.reservedAppointment$.subscribe(
      (reservedAppointment: IAppointment) =>
        this.reservedAppointment = reservedAppointment
    );

    const currentCustomerSubscription = this.currentCustomer$.subscribe(
      (currentCustomer: ICustomer) => this.currentCustomer = currentCustomer
    );

    const settingsMapSubscription = this.settingsMap$.subscribe(
      (settingsMap: {[name: string]: Setting }) => {
        this.emailEnabled = settingsMap.IncludeEmail.value;
        this.smsEnabled = settingsMap.IncludeSms.value;
        this.emailAndSmsEnabled = settingsMap.IncludeEmailAndSms.value;
        this.noNotificationEnabled = settingsMap.NoNotification.value;
      }
    );

    this.subscriptions.add(titleSubscription);
    this.subscriptions.add(notesSubscription);
    this.subscriptions.add(notificationTypeSubscription);
    this.subscriptions.add(selectedBranchSubscription);
    this.subscriptions.add(selectedDateSubscription);
    this.subscriptions.add(selectedTimeSubscription);
    this.subscriptions.add(reservedAppointmentSubscription);
    this.subscriptions.add(currentCustomerSubscription);
    this.subscriptions.add(settingsMapSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  isConfirmDisabled() {
    if (this.hasNotificationOptionsEnabled()) {
      return this.hasSelectedNotificationType() && this.currentCustomer && this.reservedAppointment ? false : true;
    } else {
      return this.currentCustomer && this.reservedAppointment ? false : true;
    }
  }

  handleBooking () {
    if (!this.notificationTypeIsValid()) {
      // const modal = this.modalService.openNotificationModal();
      // modal.result.then()
    } else {
      this.bookAppointment();
    }
  }

  bookAppointment() {
    const branchPublicId = this.selectedBranches[0].publicId;
    const date = this.selectedDate.slice(0, 10);
    const time = this.selectedTime;

    const bookingInformation: IBookingInformation = {
      branchPublicId,
      date,
      time
    };

    const appointment: IAppointment = {
      ...this.reservedAppointment,
      customers: [this.currentCustomer],
      notes: encodeURIComponent(this.notes),
      title: this.title,
      custom: this.getAppointmentCustomJson()
    };

    this.bookingDispatchers.bookAppointment(bookingInformation, appointment);
  }

  hasNotificationOptionsEnabled(): boolean {
    return this.emailEnabled === true
            || this.smsEnabled === true
            || this.emailAndSmsEnabled === true
            || this.noNotificationEnabled === true;
  }

  hasSelectedNotificationType(): boolean {
    return this.notificationType !== '';
  }

  notificationTypeIsValid(): boolean {
    const notificationType: string = this.notificationType;

    switch (notificationType) {
      case 'sms': {
        return this.currentCustomer.phone !== '';
      }
      case 'email': {
        return this.currentCustomer.email !== '';
      }
      case 'both': {
        return this.currentCustomer.phone !== '' && this.currentCustomer.email !== '';
      }
      default: {
        return true;
      }
    }
  }

  getAppointmentCustomJson(): string {
    const notificationType: string = this.notificationType;

    switch (notificationType) {
      case 'sms': {
        return `{`
                + `"phoneNumber":"${this.currentCustomer.phone}",`
                + `"notificationType":"${this.notificationType}",`
                + `"appId":"generic"`
              + `}`;
      }
      case 'email': {
        return `{`
                + `"email":"${this.currentCustomer.email}",`
                + `"notificationType":"${this.notificationType}",`
                + `"appId":"generic"`
              + `}`;
      }
      case 'both': {
        return `{`
                + `"phoneNumber":"${this.currentCustomer.phone}",`
                + `"email":"${this.currentCustomer.email}",`
                + `"notificationType":"${this.notificationType}",`
                + `"appId":"generic"`
              + `}`;
      }
      default: {
        return '';
      }
    }
  }
}

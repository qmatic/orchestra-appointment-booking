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
  SettingsAdminSelectors,
  FETCH_LICENSE_INFO,
  BookingHelperSelectors,
  ServiceDispatchers,
  CustomerDispatchers,
  AppointmentMetaDispatchers,
  AppointmentDispatchers,
  ServiceSelectors,
  AppointmentSelectors
} from '../../../../store';
import { IBookingInformation } from '../../../../models/IBookingInformation';
import { ICustomer } from '../../../../models/ICustomer';
import { IBranch } from '../../../../models/IBranch';
import { Setting } from '../../../../models/Setting';
import { ModalService } from '../../../../services/util/modal.service';
import { QmModalService } from '../../presentational/qm-modal/qm-modal.service';
import { IService } from '../../../../models/IService';
import { ToastService } from '../../../../services/util/toast.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'qm-booking-footer',
  templateUrl: './qm-booking-footer.component.html',
  styleUrls: ['./qm-booking-footer.component.scss'],
})
export class QmBookingFooterComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private reservedAppointment$: Observable<IAppointment>;
  private currentCustomer$: Observable<ICustomer>;
  private title$: Observable<string>;
  private notes$: Observable<string>;
  private selectedServices$: Observable<IService[]>;
  private selectedBranches$: Observable<IBranch[]>;
  private notificationType$: Observable<string>;
  private selectedDate$: Observable<string>;
  private selectedTime$: Observable<string>;
  public userDirection$: Observable<string>;
  private isPrintEnabled$: Observable<boolean>;
  private settingsMap$: Observable<{ [name: string]: Setting }>;
  private numberOfCustomers$: Observable<number>;
  private selectedAppointment$: Observable<IAppointment>;
  private printAppointment$: Observable<boolean>;

  private numberOfCustomers: number;
  private emailEnabled: boolean;
  private smsEnabled: boolean;
  private emailAndSmsEnabled: boolean;
  private noNotificationEnabled: boolean;
  private titleEnabled: boolean;
  private notesEnabled: boolean;
  private isPrintAppointment: boolean;
  private defaultPhoneCountryCode: string;
  private reservedAppointment: IAppointment;
  private selectedServices: IService[];
  private selectedBranches: IBranch[];
  private selectedDate: string;
  private selectedTime: string;
  private currentCustomer: ICustomer;
  private notificationType: string;
  private title: string;
  private notes: string;
  public selectedAppointment: IAppointment;

  constructor(
    private customerSelectors: CustomerSelectors,
    private reserveSelectors: ReserveSelectors,
    private serviceSelectors: ServiceSelectors,
    private bookingDispatchers: BookingDispatchers,
    private appointmentMetaSelectors: AppointmentMetaSelectors,
    private branchSelectors: BranchSelectors,
    private dateSelectors: DateSelectors,
    private timeslotSelectors: TimeslotSelectors,
    private userSelectors: UserSelectors,
    private settingsAdminSelectors: SettingsAdminSelectors,
    private modalService: ModalService,
    private bookingHelperSelectors: BookingHelperSelectors,
    private qmModalService: QmModalService,
    private serviceDispatchers: ServiceDispatchers,
    private customerDispatchers: CustomerDispatchers,
    private appointmentMetaDispatchers: AppointmentMetaDispatchers,
    private appointmentDispatchers: AppointmentDispatchers,
    private appointmentSelectors: AppointmentSelectors,
    private toastService: ToastService,
    private translateService: TranslateService
  ) {
    this.currentCustomer$ = this.customerSelectors.currentCustomer$;
    this.reservedAppointment$ = this.reserveSelectors.reservedAppointment$;
    this.selectedServices$ = this.serviceSelectors.selectedServices$;
    this.selectedBranches$ = this.branchSelectors.selectedBranch$;
    this.selectedDate$ = this.dateSelectors.selectedDate$;
    this.selectedTime$ = this.timeslotSelectors.selectedTime$;
    this.title$ = this.appointmentMetaSelectors.title$;
    this.notes$ = this.appointmentMetaSelectors.notes$;
    this.notificationType$ = this.appointmentMetaSelectors.notificationType$;
    this.userDirection$ = this.userSelectors.userDirection$;
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
    this.numberOfCustomers$ = this.bookingHelperSelectors.selectedNumberOfCustomers$;
    this.selectedAppointment$ = this.appointmentSelectors.selectedAppointment$;
    this.printAppointment$ = this.appointmentMetaSelectors.printAppointmentOption$;
  }

  ngOnInit() {
    const titleSubscription = this.title$.subscribe(
      (title: string) => this.title = title
    );

    const notesSubscription = this.notes$.subscribe(
      (notes: string) => this.notes = notes
    );

    const numberOfCustomersSubscription = this.numberOfCustomers$.subscribe(
      (selectedNumberOfCustomers: number) => this.numberOfCustomers = selectedNumberOfCustomers
    );

    const notificationTypeSubscription = this.notificationType$.subscribe(
      (notificationType: string) => this.notificationType = notificationType
    );

    const selectedServicesSubscription = this.selectedServices$.subscribe(
      (selectedServices: IService[]) => this.selectedServices = selectedServices
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
        this.defaultPhoneCountryCode = settingsMap.CustomerPhoneDefaultCountry.value;
        this.titleEnabled = settingsMap.Title.value;
        this.notesEnabled = settingsMap.Notes.value;
      }
    );

    const selectedAppointmentSubscription = this.selectedAppointment$.subscribe(
      (selectedAppointment: IAppointment) => {
        this.selectedAppointment = selectedAppointment;
      }
    );

    const printAppointmentSubscription = this.appointmentMetaSelectors.printAppointmentOption$.subscribe(isPrint =>
      this.isPrintAppointment = isPrint
    );

    this.subscriptions.add(titleSubscription);
    this.subscriptions.add(notesSubscription);
    this.subscriptions.add(numberOfCustomersSubscription);
    this.subscriptions.add(notificationTypeSubscription);
    this.subscriptions.add(selectedServicesSubscription);
    this.subscriptions.add(selectedBranchSubscription);
    this.subscriptions.add(selectedDateSubscription);
    this.subscriptions.add(selectedTimeSubscription);
    this.subscriptions.add(reservedAppointmentSubscription);
    this.subscriptions.add(currentCustomerSubscription);
    this.subscriptions.add(settingsMapSubscription);
    this.subscriptions.add(selectedAppointmentSubscription);
    this.subscriptions.add(printAppointmentSubscription);
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
      const missingNotificationType = this.getMissingNotificationType();
      const modal = this.modalService.openNotificationModal(missingNotificationType);
      modal.result.then((updatedCustomer: ICustomer) => {
        if (updatedCustomer !== undefined) {
          this.bookAppointment(updatedCustomer);
        }
      }).catch(() => {});
    } else {
      this.bookAppointment();
    }
  }

  handleClearAllFields () {
    this.promptUserIfOngoingBooking();
  }

  promptUserIfOngoingBooking() {
    if (!this.isInEditMode()) {
      const bookingIsStarted = this.bookingStarted();
      if (bookingIsStarted) {
        this.qmModalService.openForTransKeys(
          'label.clearBookingModal.headline',
          '',
          'button.clearBookingModal.cancel',
          'button.clearBookingModal.ok',
          (cancelClicked: Boolean) => {
            if (!cancelClicked) {
              this.clearAllFields();
              this.translateService.get('label.successfully.cleared.fields').subscribe(
                (label: string) => this.toastService.successToast(label)
              ).unsubscribe();
            }
          },
          () => {
          });
      }
    } else {
      this.clearAllFields();
    }
  }

  bookingStarted(): boolean {
    return this.currentCustomer !== null
            || this.selectedServices.length > 0
            || this.title !== ''
            || this.notes !== '';
  }

  isInEditMode(): boolean {
    return this.selectedAppointment !== null;
  }

  clearAllFields() {
    this.serviceDispatchers.deselectServices();
    this.appointmentMetaDispatchers.resetAllAppointmentMeta();

    if (this.isInEditMode()) {
      this.appointmentDispatchers.resetAppointment();
    } else {
      this.customerDispatchers.resetCurrentCustomer();
      this.appointmentDispatchers.resetAppointments();
    }
  }

  bookAppointment(currentCustomer = this.currentCustomer) {
    const branchPublicId = this.selectedBranches[0].publicId;
    const date = this.selectedDate.slice(0, 10);
    const time = this.selectedTime;

    const bookingInformation: IBookingInformation = {
      branchPublicId,
      date,
      time,
      numberOfCustomers: this.numberOfCustomers
    };

    const appointment: IAppointment = {
      ...this.reservedAppointment,
      customers: [this.currentCustomer],
      notes: this.getNotes(),
      title: this.getTitle(),
      custom: this.getAppointmentCustomJson(currentCustomer)
    };

    this.bookingDispatchers.bookAppointment(bookingInformation, appointment);
  }

  getTitle(): string {
    return this.titleEnabled ? this.title : '';
  }

  getNotes(): string {
    return this.notesEnabled ? `${this.notes}` : '';
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
        return this.currentCustomer.phone !== '' && this.currentCustomer.phone !== this.defaultPhoneCountryCode;
      }
      case 'email': {
        return this.currentCustomer.email !== '';
      }
      case 'both': {
        return this.currentCustomer.phone !== ''
              && this.currentCustomer.phone !== this.defaultPhoneCountryCode
              && this.currentCustomer.email !== '';
      }
      default: {
        return true;
      }
    }
  }

  getMissingNotificationType(): string {
    const notificationType: string = this.notificationType;

    switch (notificationType) {
      case 'sms': {
        return notificationType;
      }
      case 'email': {
        return notificationType;
      }
      case 'both': {
        if ((this.currentCustomer.phone === '' || this.currentCustomer.phone === this.defaultPhoneCountryCode)
              && this.currentCustomer.email === '') {
          return notificationType;
        } else if (this.currentCustomer.phone === '' || this.currentCustomer.phone === this.defaultPhoneCountryCode) {
          return 'sms';
        } else {
          return 'email';
        }
      }
      default: {
        return '';
      }
    }
  }

  getAppointmentCustomJson(currentCustomer: ICustomer): string {
    if (this.hasNotificationOptionsEnabled()) {
      const notificationType: string = this.notificationType;
      switch (notificationType) {
        case 'sms': {
          return `{`
                  + `"phoneNumber":"${currentCustomer.phone}",`
                  + `"notificationType":"${notificationType}",`
                  + `"appId":"generic"`
                + `}`;
        }
        case 'email': {
          return `{`
                  + `"email":"${currentCustomer.email}",`
                  + `"notificationType":"${notificationType}",`
                  + `"appId":"generic"`
                + `}`;
        }
        case 'both': {
          return `{`
                  + `"phoneNumber":"${currentCustomer.phone}",`
                  + `"email":"${currentCustomer.email}",`
                  + `"notificationType":"${notificationType}",`
                  + `"appId":"generic"`
                + `}`;
        }
        case 'none': {
          return `{`
                  + `"notificationType":"${notificationType}",`
                  + `"appId":"generic"`
                + `}`;
        }
        default: {
          return '';
        }
      }
    } else {
      return '';
    }
  }
}

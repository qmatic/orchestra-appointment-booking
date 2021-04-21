import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { IBranch } from './../../../../models/IBranch';
import { Setting } from './../../../../models/Setting';
import { NavigationService } from './../../../util/navigation.service';
import { IAppointment } from './../../../../models/IAppointment';
import { ICustomer } from './../../../../models/ICustomer';
import { UserSelectors, SettingsAdminSelectors, SystemInfoSelectors, AppointmentDispatchers, AppointmentSelectors } from '../../../../store/index';
import { PrintSelectors } from '../../../../store/services/print/index';
import { BOOKING_HOME_URL } from '../../containers/qm-page-header/header-navigation';
import { ToastService } from '../../../../services/util/toast.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
@Component({
  selector: 'qm-qm-print-confirm',
  templateUrl: './qm-print-confirm.component.html',
  styleUrls: ['./qm-print-confirm.component.scss']
})
export class QmPrintConfirmComponent implements OnInit, OnDestroy {
  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;
  private subscriptions: Subscription = new Subscription();
  currentCustomer: ICustomer;
  bookedAppointment: IAppointment;
  qpAppointment: IAppointment;
  userDirection$: Observable<string>;
  private timeConvention$: Observable<string>;
  private timeConvention: string;
  printedAppointment$: Observable<IAppointment>;
  private settingsMap$: Observable<{ [name: string]: Setting }>;
  phoneEnabled = true;
  emailEnabled = true;
  public emailTemplateEnabled: boolean;
  public emailTemplate: string;
  public appointmentLoading: boolean;
  public appointmentLoaded: boolean;
  private dateConvention$: Observable<string>;
  public dateFormat = 'dddd MMMM DD YYYY';

  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private userSelectors: UserSelectors,
    private settingsMapSelectors: SettingsAdminSelectors,
    private printSelectors: PrintSelectors,
    private systemInfoSelectors: SystemInfoSelectors,
    private appointmentDispatchers: AppointmentDispatchers,
    private appointmentSelctors: AppointmentSelectors,
    private toastService: ToastService,
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.settingsMap$ = this.settingsMapSelectors.settingsAsMap$;
    this.printedAppointment$ = this.printSelectors.printedAppointment$;
    this.timeConvention$ = this.systemInfoSelectors.systemInfoTimeConvention$;
    this.dateConvention$ = this.systemInfoSelectors.systemInfoDateConvention$;
  }

  ngOnInit() {
    this.toastService.setToastContainer(this.toastContainer);

    const printAppointmentSubscription = this.printedAppointment$.subscribe(bapp => {
      this.bookedAppointment = bapp;
    });

    const timeConventionSubscription = this.timeConvention$.subscribe(
      timeConvention => this.timeConvention = timeConvention
    );

    const appointmentLoadingSubscription = this.appointmentSelctors.appointmentsLoading$.subscribe(state => {
      this.appointmentLoading = state;
    });

    const appointmentLoadedSubscription = this.appointmentSelctors.appointmentsLoaded$.subscribe(state => {
      this.appointmentLoaded = state;
    });

    if (this.bookedAppointment && this.bookedAppointment.customers && this.bookedAppointment.customers.length > 0) {
      this.currentCustomer = this.bookedAppointment.customers[0];
    }

    const settingsSubscription = this.settingsMap$.subscribe(
      (settingsMap: { [name: string]: Setting }) => {
        this.emailTemplateEnabled = settingsMap.ShowEmailTemplate.value;
        this.printedAppointment$.subscribe(() => {
          this.phoneEnabled = settingsMap.CustomerIncludePhone.value && (
            ( (settingsMap.CustomerPhoneDefaultCountry.value && settingsMap.CustomerPhoneDefaultCountry.value !== '') ?
             settingsMap.CustomerPhoneDefaultCountry.value.trim() : '')
             !== (this.currentCustomer ? (this.currentCustomer.phone ? this.currentCustomer.phone.trim() : '') : ''));
        }).unsubscribe();

        this.emailEnabled = settingsMap.CustomerIncludeEmail.value;
      }
    );

    const qpAppointmentSubscription = this.appointmentSelctors.qpAppointment$.subscribe(qpApp => {
      this.qpAppointment = qpApp;
        if (this.qpAppointment && this.emailTemplateEnabled && ((this.appointmentLoaded && !this.appointmentLoading) || ((this.qpAppointment && this.qpAppointment.publicId === this.bookedAppointment.publicId)))) {
          this.appointmentDispatchers.fetchAppointmentEmailTemplete(this.qpAppointment.id);
        }
    });
    const emailTemplateSubscription = this.appointmentSelctors.emailTemplete$.subscribe(template => {
      this.emailTemplate = template;
      if (this.emailTemplateEnabled ) {
        const emailConatiner = document.getElementById('emailTemplate');
        emailConatiner.innerHTML = this.emailTemplate;
      // }
    }});
    const dateConventionSubscription = this.dateConvention$.subscribe(
      (dateConvention: string) => {
        this.dateFormat = dateConvention || 'dddd MMMM DD YYYY';
      }
    );
    this.subscriptions.add(dateConventionSubscription);
    this.subscriptions.add(printAppointmentSubscription);
    this.subscriptions.add(timeConventionSubscription);
    this.subscriptions.add(settingsSubscription);
    this.subscriptions.add(qpAppointmentSubscription);
    this.subscriptions.add(emailTemplateSubscription);
    this.subscriptions.add(appointmentLoadingSubscription);
    this.subscriptions.add(appointmentLoadedSubscription);
  }



  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    const emailConatiner = document.getElementById('emailTemplate');
    emailConatiner.innerHTML = '';
    this.appointmentDispatchers.ResetAppointmentLoaded();
  }

  getTimeFormat(): string {
    if (this.timeConvention === 'AMPM') {
      return 'hh:mm A';
    } else {
      return 'HH:mm';
    }
  }

  cancelEdit() {
    this.navigationService.goToHome();
  }

  getBranchAddressText(branch: IBranch) {
    let completeAddress = '';
    if (branch) {
      const fieldsToLookFor = [
        'addressLine1',
        'addressLine2',
        'addressZip',
        'addressCity',
        'addressCountry'
      ];

      completeAddress = fieldsToLookFor.reduce((acc, curr) => {
        if (curr in branch) {
          const value = branch[curr];
          if (value !== null && value !== '') {
            if (acc === '') {
              return value;
            } else {
              return (acc += ', ' + value);
            }
          }
        }
        return acc;
      }, '');
    }

    return completeAddress;
  }

  printAppointment() {

    window['onafterprint'] = () => {
      setTimeout(() => {
        this.router.navigateByUrl(BOOKING_HOME_URL);
        window['onafterprint'] = null;
      }, 3000);
    };

    window.print();
  }
}

import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import {
  CustomerDispatchers,
  AppointmentDispatchers,
  CustomerSelectors,
  SettingsAdminSelectors,
  UserSelectors,
  AppointmentSelectors
} from '../../../../store';
import { ToastService } from '../../../../services/util/toast.service';
import { ICustomer } from '../../../../models/ICustomer';
import { ModalService } from '../../../../services/util/modal.service';
import { Setting } from '../../../../models/Setting';
import { IAppointment } from '../../../../models/IAppointment';

@Component({
  selector: 'qm-customer-card',
  templateUrl: './qm-customer-card.component.html',
  styleUrls: ['./qm-customer-card.component.scss']
})
export class QmCustomerCardComponent implements OnInit, OnDestroy {
  @Input() customer: ICustomer;
  subscriptions: Subscription = new Subscription();
  userDirection$: Observable<string>;
  toastMessage$: Observable<string>;
  toastMessage: string;
  settingsMap$: Observable<{ [name: string]: Setting }>;
  phoneEnabled: boolean;
  emailEnabled: boolean;

  private selectedAppointment$: Observable<IAppointment>;
  public allowClearCustomer: boolean;

  constructor(
    private customerDispatchers: CustomerDispatchers,
    private appointmentDispatchers: AppointmentDispatchers,
    private appointmentSelectors: AppointmentSelectors,
    private toastService: ToastService,
    private translateService: TranslateService,
    private modalService: ModalService,
    private settingsAdminSelectors: SettingsAdminSelectors,
    private userSelectors: UserSelectors
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
    this.selectedAppointment$ = this.appointmentSelectors.selectedAppointment$;
  }

  ngOnInit() {
    this.toastMessage$
      = this.translateService
          .get('label.clear.customer.success', {0: this.customer.name});

          const toastMessageSubscription = this.toastMessage$.subscribe(
        (msg) => this.toastMessage = msg
    );

    const settingsMapSubscription = this.settingsMap$.subscribe(
      (settingsMap: { [name: string]: Setting }) => {
        this.phoneEnabled = settingsMap.CustomerIncludePhone.value === true;
        this.emailEnabled = settingsMap.CustomerIncludeEmail.value === true;
      }
    );

    const selectedAppointmentSubscription = this.selectedAppointment$.subscribe(
      (selectedAppointment: IAppointment) => {
        if (selectedAppointment !== null) {
          this.allowClearCustomer = false;
        } else {
          this.allowClearCustomer = true;
        }
      }
    );

    this.subscriptions.add(toastMessageSubscription);
    this.subscriptions.add(settingsMapSubscription);
    this.subscriptions.add(selectedAppointmentSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  resetCurrentCustomer () {
    this.toastService.successToast(this.toastMessage);
    this.customerDispatchers.resetCurrentCustomer();
  }

  updateCustomer() {
    this.modalService.openUpdateCustomerModal();
  }
}

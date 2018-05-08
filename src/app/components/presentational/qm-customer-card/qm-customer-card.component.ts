import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import {
  CustomerDispatchers,
  AppointmentDispatchers,
  CustomerSelectors,
  SettingsAdminSelectors,
  UserSelectors
} from '../../../../store';
import { ToastService } from '../../../../services/util/toast.service';
import { ICustomer } from '../../../../models/ICustomer';
import { ModalService } from '../../../../services/util/modal.service';
import { Setting } from '../../../../models/Setting';

@Component({
  selector: 'qm-customer-card',
  templateUrl: './qm-customer-card.component.html',
  styleUrls: ['./qm-customer-card.component.scss']
})
export class QmCustomerCardComponent implements OnInit, OnDestroy {
  @Input() customer: ICustomer;
  private subscriptions: Subscription = new Subscription();
  private userDirection$: Observable<string>;
  private toastMessage$: Observable<string>;
  private toastMessage: string;
  private settingsMap$: Observable<{ [name: string]: Setting }>;

  private phoneEnabled: boolean;
  private emailEnabled: boolean;

  constructor(
    private customerDispatchers: CustomerDispatchers,
    private appointmentDispatchers: AppointmentDispatchers,
    private toastService: ToastService,
    private translateService: TranslateService,
    private modalService: ModalService,
    private settingsAdminSelectors: SettingsAdminSelectors,
    private userSelectors: UserSelectors
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
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

    this.subscriptions.add(toastMessageSubscription);
    this.subscriptions.add(settingsMapSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  resetCurrentCustomer () {
    this.toastService.successToast(this.toastMessage);
    this.customerDispatchers.resetCurrentCustomer();
    this.appointmentDispatchers.resetAppointments();
  }

  updateCustomer() {
    this.modalService.openUpdateCustomerModal();
  }
}

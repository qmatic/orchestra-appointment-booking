import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription ,  Observable } from 'rxjs';

import {
  CustomerDispatchers,
  AppointmentDispatchers,
  CustomerSelectors,
  SettingsAdminSelectors,
  UserSelectors,
  AppointmentSelectors,
  AppointmentHistoryDispatchers,
  AppointmentHistorySelectors
} from '../../../../../store';
import { ICustomer } from '../../../../../models/ICustomer';
import { ModalService } from '../../../../../services/util/modal.service';
import { Setting } from '../../../../../models/Setting';
import { IAppointment } from '../../../../../models/IAppointment';

@Component({
  selector: 'qm-customer-history-card',
  templateUrl: './qm-customer-history-card.component.html',
  styleUrls: ['./qm-customer-history-card.component.scss']
})
export class QmCustomerHistoryCardComponent implements OnInit, OnDestroy {
  @Input() customer: ICustomer;
  @Input() editBtn: boolean;
  subscriptions: Subscription = new Subscription();
  userDirection$: Observable<string>;
  settingsMap$: Observable<{ [name: string]: Setting }>;
  phoneEnabled: boolean;
  emailEnabled: boolean;
  public visitList: any[] = [];

  public allowClearCustomer: boolean;

  constructor(
    private customerDispatchers: CustomerDispatchers,
    private appointmentDispatchers: AppointmentDispatchers,
    private appointmentHistorySelectors: AppointmentHistorySelectors,
    private appointmentHistoryDispatchers: AppointmentHistoryDispatchers,
    private appointmentSelectors: AppointmentSelectors,
    private modalService: ModalService,
    private settingsAdminSelectors: SettingsAdminSelectors,
    private userSelectors: UserSelectors
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
  }

  ngOnInit() {

    const settingsMapSubscription = this.settingsMap$.subscribe(
      (settingsMap: { [name: string]: Setting }) => {
        this.phoneEnabled = settingsMap.CustomerIncludePhone.value === true;
        this.emailEnabled = settingsMap.CustomerIncludeEmail.value === true;
      }
    );

    this.subscriptions.add(settingsMapSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  resetCurrentCustomer () {
    this.customerDispatchers.resetCurrentCustomer();
    this.appointmentHistoryDispatchers.resetActionAppointment();
  }

  updateCustomer() {
    this.modalService.openUpdateCustomerModal();
  }
}

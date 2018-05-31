import { Component, OnInit, Input, OnDestroy } from '@angular/core';
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
  settingsMap$: Observable<{ [name: string]: Setting }>;
  phoneEnabled: boolean;
  emailEnabled: boolean;

  private selectedAppointment$: Observable<IAppointment>;
  public allowClearCustomer: boolean;

  constructor(
    private customerDispatchers: CustomerDispatchers,
    private appointmentDispatchers: AppointmentDispatchers,
    private appointmentSelectors: AppointmentSelectors,
    private modalService: ModalService,
    private settingsAdminSelectors: SettingsAdminSelectors,
    private userSelectors: UserSelectors
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
    this.selectedAppointment$ = this.appointmentSelectors.selectedAppointment$;
  }

  ngOnInit() {

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

    this.subscriptions.add(settingsMapSubscription);
    this.subscriptions.add(selectedAppointmentSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  resetCurrentCustomer () {
    this.customerDispatchers.resetCurrentCustomer();
  }

  updateCustomer() {
    this.modalService.openUpdateCustomerModal();
  }
}

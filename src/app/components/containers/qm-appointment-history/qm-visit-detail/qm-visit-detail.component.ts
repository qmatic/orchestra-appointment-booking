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
import { IAppointmentVisit } from '../../../../../models/IAppointmentVisit';

@Component({
  selector: 'qm-visit-detail',
  templateUrl: './qm-visit-detail.component.html',
  styleUrls: ['./qm-visit-detail.component.scss']
})
export class QmVisitDetailComponent implements OnInit, OnDestroy {
  @Input() editBtn: boolean;
  subscriptions: Subscription = new Subscription();
  userDirection$: Observable<string>;
  settingsMap$: Observable<{ [name: string]: Setting }>;
  phoneEnabled: boolean;
  emailEnabled: boolean;
  public visitList: any[] = [];
  public selectedAppointment: IAppointment;

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

    const appointmentSubcription = this.appointmentHistorySelectors.appointment$.subscribe(
      appointment => {
          this.selectedAppointment = appointment;
      }
    );
    this.subscriptions.add(appointmentSubcription);

    const appointmentVisitSubcription = this.appointmentHistorySelectors.appointmentVisit$.subscribe(
      appointmentVisit => {
          this.visitList = appointmentVisit;
      }
    );
    this.subscriptions.add(appointmentVisitSubcription);
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

  backToAppointmentList() {
    this.appointmentHistoryDispatchers.resetAppointmentVisit();
  }
}

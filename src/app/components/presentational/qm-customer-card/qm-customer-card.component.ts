import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import {
  CustomerDispatchers,
  AppointmentDispatchers,
  CustomerSelectors
} from '../../../../store';
import { ToastService } from '../../../../services/util/toast.service';
import { ICustomer } from '../../../../models/ICustomer';
import { ModalService } from '../../../../services/util/modal.service';

@Component({
  selector: 'qm-customer-card',
  templateUrl: './qm-customer-card.component.html',
  styleUrls: ['./qm-customer-card.component.scss']
})
export class QmCustomerCardComponent implements OnInit, OnDestroy {
  @Input() customer: ICustomer;
  private subscriptions: Subscription = new Subscription();
  private toastMessage$: Observable<string>;
  private toastMessage: string;

  constructor(
    private customerDispatchers: CustomerDispatchers,
    private appointmentDispatchers: AppointmentDispatchers,
    private toastService: ToastService,
    private translateService: TranslateService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.toastMessage$
      = this.translateService
          .get('label.clear.customer.success', {0: this.customer.name});
    const toastMessageSubscription
      = this.toastMessage$.subscribe(
        (msg) => this.toastMessage = msg);
    this.subscriptions.add(toastMessageSubscription);
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

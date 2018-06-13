import { IAppointment } from './../../../../models/IAppointment';
import { ICustomer } from './../../../../models/ICustomer';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerSelectors, BookingSelectors } from '../../../../store/index';

@Component({
  selector: 'qm-qm-print-confirm',
  templateUrl: './qm-print-confirm.component.html',
  styleUrls: ['./qm-print-confirm.component.scss']
})
export class QmPrintConfirmComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription();
  private currentCustomer: ICustomer;
  private bookedAppointment: IAppointment;

  constructor(private customerSelectors: CustomerSelectors, private bookingSelectors: BookingSelectors) { }

  ngOnInit() {
    const bookedAppointmentSubscription = this.bookingSelectors.bookedAppointment$.subscribe(bapp => {
      this.bookedAppointment = bapp;
      if (bapp && bapp.customers && bapp.customers.length > 0) {
        this.currentCustomer = bapp.customers[0];
      }
    });

   this.subscriptions.add(bookedAppointmentSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

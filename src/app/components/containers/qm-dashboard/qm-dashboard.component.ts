import {
  ReservationExpiryTimerDispatchers
} from './../../../../store/services/reservation-expiry-timer/reservation-expiry-timer.dispatchers';
import { CalendarSettingsSelectors } from './../../../../store/services/calendar-settings/calendar-settings.selectors';
import { ReservationExpiryTimerSelectors } from './../../../../store/services/reservation-expiry-timer/reservation-expiry-timer.selectors';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ICustomer } from '../../../../models/ICustomer';
import { CustomerSelectors, UserSelectors, BookingHelperSelectors } from '../../../../store';
import { IService } from '../../../../models/IService';

@Component({
  selector: 'qm-dashboard',
  templateUrl: './qm-dashboard.component.html',
  styleUrls: ['./qm-dashboard.component.scss']
})
export class QmDashboardComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  userDirection$: Observable<string>;
  currentCustomer$: Observable<ICustomer>;
  selectedServices$: Observable<IService[]>;
  currentCustomer: ICustomer;
  showExpiryReservationTime$: Observable<Boolean>;

  private selectedServices: IService[];

  constructor(
    private customerSelectors: CustomerSelectors,
    private userSelectors: UserSelectors,
    private reservationExpiryTimerSelectors: ReservationExpiryTimerSelectors,
    private calendarSettingsSelectors: CalendarSettingsSelectors,
    private reservationExpiryTimerDispatchers: ReservationExpiryTimerDispatchers,
    private bookingHelperSelectors: BookingHelperSelectors
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.currentCustomer$ = this.customerSelectors.currentCustomer$;
    this.selectedServices$ = this.bookingHelperSelectors.selectedServices$;
    // Bing wheather to show or not the timer
    this.showExpiryReservationTime$ = this.reservationExpiryTimerSelectors.showReservationExpiryTime$;
  }

  ngOnInit() {
    const currentCustomerSubscription = this.currentCustomer$.subscribe(
      (customer: ICustomer) => (this.currentCustomer = customer)
    );

    const selectedServicesSubscription = this.selectedServices$.subscribe(
      (selectedServices: IService[]) => this.selectedServices = selectedServices
    );

    this.subscriptions.add(currentCustomerSubscription);
    this.subscriptions.add(selectedServicesSubscription);
  }

  customerAppointmentsAreVisible(): boolean {
    return this.currentCustomer !== null && this.selectedServices.length === 0;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

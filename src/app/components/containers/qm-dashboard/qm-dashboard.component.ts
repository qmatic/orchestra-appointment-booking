import { ReservationExpiryTimerDispatchers } from './../../../../store/services/reservation-expiry-timer/reservation-expiry-timer.dispatchers';
import { CalendarSettingsSelectors } from './../../../../store/services/calendar-settings/calendar-settings.selectors';
import { ReservationExpiryTimerSelectors } from './../../../../store/services/reservation-expiry-timer/reservation-expiry-timer.selectors';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ICustomer } from '../../../../models/ICustomer';
import { CustomerSelectors, UserSelectors } from '../../../../store';

@Component({
  selector: 'qm-dashboard',
  templateUrl: './qm-dashboard.component.html',
  styleUrls: ['./qm-dashboard.component.scss']
})
export class QmDashboardComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  userDirection$: Observable<string>;
  currentCustomer$: Observable<ICustomer>;
  currentCustomer: ICustomer;
  showExpiryReservationTime$: Observable<Boolean>;

  constructor(
    private customerSelectors: CustomerSelectors,
    private userSelectors: UserSelectors,
    private reservationExpiryTimerSelectors: ReservationExpiryTimerSelectors,
    private calendarSettingsSelectors: CalendarSettingsSelectors,
    private reservationExpiryTimerDispatchers: ReservationExpiryTimerDispatchers
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.currentCustomer$ = this.customerSelectors.currentCustomer$;

    // Bing wheather to show or not the timer
    this.showExpiryReservationTime$ = this.reservationExpiryTimerSelectors.showReservationExpiryTime$;
  }

  ngOnInit() {
    const currentCustomerSubscription = this.currentCustomer$.subscribe(
      (customer: ICustomer) => (this.currentCustomer = customer)
    );

    this.subscriptions.add(currentCustomerSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

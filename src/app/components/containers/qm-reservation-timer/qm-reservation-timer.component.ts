import { ReservationExpiryTimerDispatchers } from './../../../../store/services/reservation-expiry-timer/reservation-expiry-timer.dispatchers';
import { CalendarSettingsSelectors } from './../../../../store/services/calendar-settings/calendar-settings.selectors';
import { ReservationExpiryTimerSelectors } from './../../../../store/services/reservation-expiry-timer/reservation-expiry-timer.selectors';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ICustomer } from '../../../../models/ICustomer';
import { CustomerSelectors, UserSelectors } from '../../../../store';

@Component({
  selector: 'qm-reservation-timer',
  templateUrl: './qm-reservation-timer.component.html',
  styleUrls: ['./qm-reservation-timer.component.scss']
})
export class QmReservationTimerComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  userDirection$: Observable<string>;
  reservationTime$: Observable<Number>;
  getExpiryReservationTime$: Observable<Number>;

  constructor(
    private userSelectors: UserSelectors,
    private reservationExpiryTimerSelectors: ReservationExpiryTimerSelectors,
    private calendarSettingsSelectors: CalendarSettingsSelectors,
    private reservationExpiryTimerDispatchers: ReservationExpiryTimerDispatchers
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.reservationTime$ = this.reservationExpiryTimerSelectors.reservationExpiryTime$;
    this.getExpiryReservationTime$ = this.calendarSettingsSelectors.getReservationExpiryTime$;
  }

  ngOnInit() {
    const expiryReservationTimerSubscription = this.getExpiryReservationTime$.subscribe(
      (time: Number) => {
        console.error(time);

        setTimeout(() => {}, 1000);
      }
    );

    this.subscriptions.add(expiryReservationTimerSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

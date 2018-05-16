import { TranslateService } from '@ngx-translate/core';
import { ToastService } from './../../../../services/util/toast.service';
import { TimeUtils } from './../../../../services/util/timeUtils.service';
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
  reservationTime$: Observable<number>;
  getExpiryReservationTime$: Observable<number>;
  onGoingReservationTime$: Observable<number>;
  counterString: string;

  constructor(
    private userSelectors: UserSelectors,
    private reservationExpiryTimerSelectors: ReservationExpiryTimerSelectors,
    private calendarSettingsSelectors: CalendarSettingsSelectors,
    private reservationExpiryTimerDispatchers: ReservationExpiryTimerDispatchers,
    private timeUtils: TimeUtils,
    private toastService: ToastService,
    private translate: TranslateService
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.reservationTime$ = this.reservationExpiryTimerSelectors.reservationExpiryTime$;
    this.getExpiryReservationTime$ = this.calendarSettingsSelectors.getReservationExpiryTime$;
    // Bind on going reservation expiry counter to view
    this.onGoingReservationTime$ = this.reservationExpiryTimerSelectors.reservationExpiryTime$;
  }

  ngOnInit() {
    // List to updates from counter in store
    const expiryTimeUpdateSubscription = this.onGoingReservationTime$.subscribe(
      onGoingTime => {
        if (onGoingTime >= 0) {
          // Format Number into string
          this.counterString = this.timeUtils.formatSecondsIntoMinituesAndSeconds(
            onGoingTime
          );

          if (onGoingTime === 120) {
            const translateSubscription = this.translate
              .get('label.reservation.timer.soonexpire')
              .subscribe((res: string) => {
                this.toastService.errorToast(res);
              });
            this.subscriptions.add(translateSubscription);
          }

          if (onGoingTime === 0) {
            const translateSubscription = this.translate
              .get('label.reservation.timer.expired')
              .subscribe((res: string) => {
                this.toastService.errorToast(res);
              });
            this.subscriptions.add(translateSubscription);
          }

          // Decrement counter
          setTimeout(() => {
            this.reservationExpiryTimerDispatchers.setReservationExpiryTimer(
              --onGoingTime
            );
          }, 1000);
        }
      }
    );

    this.subscriptions.add(expiryTimeUpdateSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

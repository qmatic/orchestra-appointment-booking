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
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'qm-reservation-timer',
  templateUrl: './qm-reservation-timer.component.html',
  styleUrls: ['./qm-reservation-timer.component.scss']
})
export class QmReservationTimerComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  userDirection$: Observable<string>;
  getExpiryReservationTime$: Observable<number>;
  counterString: string;
  intervalRef = null;

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
    this.getExpiryReservationTime$ = this.calendarSettingsSelectors.getReservationExpiryTime$;
  }

  ngOnInit() {
    const expiryReservationCalendarSettingSubscription = this.getExpiryReservationTime$.subscribe(
      (calendarExpiryTime: number) => {
        // If view is rendered on screen again reset timer!!
        const showTimerSubscription = this.reservationExpiryTimerSelectors.showReservationExpiryTime$.subscribe(
          value => {
            if (value) {
              this.startTimer(calendarExpiryTime);
            }
          }
        );
        this.subscriptions.add(showTimerSubscription);
      }
    );
    this.subscriptions.add(expiryReservationCalendarSettingSubscription);
  }

  startTimer(onGoingTime: number) {
    // Stop any ongoing timer!!
    clearInterval(!!this.intervalRef && this.intervalRef);

    // Format Number into string (Initial Value)
    this.counterString = this.timeUtils.formatSecondsIntoMinituesAndSeconds(
      onGoingTime
    );

    // Start timer!!
    this.intervalRef = setInterval(() => {
      // Decrement counter
      onGoingTime -= 1;

      // Format Number into string
      this.counterString = this.timeUtils.formatSecondsIntoMinituesAndSeconds(
        onGoingTime
      );

      // Set value in store!!
      this.reservationExpiryTimerDispatchers.setReservationExpiryTimer(
        onGoingTime
      );

      // 2min before expire show message "Timer about the expire!!"
      if (onGoingTime === 120) {
        const translateSubscription = this.translate
          .get('label.reservation.timer.soonexpire')
          .subscribe((res: string) => {
            this.toastService.errorToast(res);
          });
        translateSubscription.unsubscribe();
      }

      // After timer expired show message "Timer has expired!!"
      if (onGoingTime === 0) {
        const translateSubscription = this.translate
          .get('label.reservation.timer.expired')
          .subscribe((res: string) => {
            this.toastService.errorToast(res);
          });
        translateSubscription.unsubscribe();
      }

      // Stop timer when hit 0
      if (onGoingTime === 0) {
        clearInterval(this.intervalRef);
      }
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalRef);
    this.subscriptions.unsubscribe();
  }
}

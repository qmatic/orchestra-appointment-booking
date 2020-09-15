import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import {
  SettingsAdminSelectors,
  UserSelectors,
  ReservationExpiryTimerDispatchers,
  ReserveSelectors,
  CalendarSettingsSelectors
} from '../../../../store';

import { Setting } from '../../../../models/Setting';
import { IAppointment } from '../../../../models/IAppointment';

@Component({
  selector: 'qm-booking-flow',
  templateUrl: './qm-booking-flow.component.html',
  styleUrls: ['./qm-booking-flow.component.scss'],
})
export class QmBookingFlowComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private settingsMap$: Observable<{ [name: string]: Setting }>;
  private reservedAppointment$: Observable<IAppointment>;
  private userDirection$: Observable<string>;

  public userDirection: string;
  public settingsMap: { [name: string]: Setting };
  private settingReservationExpiryTime: number;
  private getExpiryReservationTime$: Observable<Number>;
  private isLanguageSelectEnabled: boolean;

  constructor(
    private settingsAdminSelectors: SettingsAdminSelectors,
    private userSelectors: UserSelectors,
    private calendarSettingsSelectors: CalendarSettingsSelectors,
    private reservationExpiryTimerDispatchers: ReservationExpiryTimerDispatchers,
    private reserveSelectors: ReserveSelectors,
  ) {
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
    this.reservedAppointment$ = this.reserveSelectors.reservedAppointment$;
    this.getExpiryReservationTime$ = this.calendarSettingsSelectors.getReservationExpiryTime$;
    this.userDirection$ = this.userSelectors.userDirection$;
  }

  ngOnInit() {
    const expiryReservationCalendarSettingSubscription = this.getExpiryReservationTime$.subscribe(
      (time: number) => {
        this.settingReservationExpiryTime = time;
      }
    );

    const userDirectionSubscription = this.userDirection$.subscribe(
      (userDirection: string) => {
        this.userDirection = userDirection;
      }
    );

    const appointmentSubscription = this.reservedAppointment$.subscribe(
      (app: IAppointment) => {
        if (app) {
          this.reservationExpiryTimerDispatchers.showReservationExpiryTimer();
          this.reservationExpiryTimerDispatchers.setReservationExpiryTimer(
            this.settingReservationExpiryTime
          );
        } else {
          this.reservationExpiryTimerDispatchers.hideReservationExpiryTimer();
        }
      }
    );

    const settingsSubscription = this.settingsMap$.subscribe(
      (settingsMap: { [name: string]: Setting }) => {
        this.settingsMap = settingsMap;
        this.isLanguageSelectEnabled = settingsMap.languageSelect.value;
      }
    );

    this.subscriptions.add(userDirectionSubscription);
    this.subscriptions.add(settingsSubscription);
    this.subscriptions.add(expiryReservationCalendarSettingSubscription);
    this.subscriptions.add(appointmentSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  /**
   * Decide if customer column should be rendered.
   */
  shouldShowCustomerColumn() {
    return this.settingsMap.MaxCustomers.value > 1;
  }
}

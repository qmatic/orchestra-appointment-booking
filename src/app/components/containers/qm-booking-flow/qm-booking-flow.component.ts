import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subscription ,  Observable } from 'rxjs';
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
  public isLanguageSelectEnabled: boolean;

  private dashboardHeight = 350;
  public dashboardRowCSSHeight = '350px';
  public dashboardRowInfoCSSHeight = '298px';
  private dashboardRemains = 100;

  constructor(
    private settingsAdminSelectors: SettingsAdminSelectors,
    private userSelectors: UserSelectors,
    private calendarSettingsSelectors: CalendarSettingsSelectors,
    private reservationExpiryTimerDispatchers: ReservationExpiryTimerDispatchers,
    private reserveSelectors: ReserveSelectors,
    private _elRef:ElementRef
  ) {
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
    this.reservedAppointment$ = this.reserveSelectors.reservedAppointment$;
    this.getExpiryReservationTime$ = this.calendarSettingsSelectors.getReservationExpiryTime$;
    this.userDirection$ = this.userSelectors.userDirection$;
  }

  @ViewChild('myDiv') theDiv:ElementRef;
  ngAfterContentChecked() {
    let elem = document.getElementById('dashboard-body');
    let elemHight = elem.clientHeight;
    if (elemHight !== this.dashboardHeight && elemHight > this.dashboardRemains) {
      this.dashboardHeight = elemHight;
      this.dashboardRowCSSHeight = (elemHight - this.dashboardRemains - 8) + 'px';
      this.dashboardRowInfoCSSHeight = (elemHight - this.dashboardRemains - 60) + 'px';
    }
  }

  ngOnInit() {
    let dashboarHeader = document.getElementById('dashboard-header');
    let dashboardFooter = document.getElementById('dashboard-footer');
    this.dashboardRemains = dashboarHeader.clientHeight + dashboardFooter.clientHeight;
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

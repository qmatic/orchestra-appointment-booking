import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppointmentSelectors, UserSelectors, SettingsAdminSelectors } from '../../../../store';
import { IAppointment } from '../../../../models/IAppointment';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import { Setting } from '../../../../models/Setting';

@Component({
  selector: 'qm-appointment-card',
  templateUrl: './qm-appointment-card.component.html',
  styleUrls: ['./qm-appointment-card.component.scss']
})
export class QmAppointmentCardComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private settingsMap$: Observable<{ [name: string]: Setting }>;
  private userDirection$: Observable<string>;
  public isMilitaryTime: boolean;
  public userDirection: string;
  @Input()
  appointment: IAppointment;

  constructor(
    private appointmentSelectors: AppointmentSelectors,
    private userSelectors: UserSelectors,
    private settingsAdminSelectors: SettingsAdminSelectors
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
  }

  ngOnInit() {
    const settingsSubscription = this.settingsMap$.subscribe(
      (settingsMap: { [name: string]: Setting }) => {
        this.isMilitaryTime = settingsMap['TimeFormat'].value !== 'AMPM';
      }
    );

    const userDirectionSubscription = this.userDirection$.subscribe(
      (userDirection: string) => {
        this.userDirection = userDirection;
      }
    );

    this.subscriptions.add(settingsSubscription);
    this.subscriptions.add(userDirectionSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getTimezoneOffset(apppointment: IAppointment) {
    return moment()
      .tz(apppointment.branch.fullTimeZone)
      .format('Z');
  }
}

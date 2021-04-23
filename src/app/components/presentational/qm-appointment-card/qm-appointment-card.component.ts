import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable ,  Subscription } from 'rxjs';
import * as moment from 'moment';
import { UserSelectors, SystemInfoSelectors, SettingsAdminSelectors } from '../../../../store';
import { IAppointment } from '../../../../models/IAppointment';
import { Setting } from '../../../../models/Setting';

@Component({
  selector: 'qm-appointment-card',
  templateUrl: './qm-appointment-card.component.html',
  styleUrls: ['./qm-appointment-card.component.scss']
})
export class QmAppointmentCardComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private timeConvention$: Observable<string>;
  private userDirection$: Observable<string>;
  public isMilitaryTime: boolean;
  public userDirection: string;
  private dateConvention$: Observable<string>;
  public dateFormat = 'dddd MMMM DD YYYY';
  private settingsMap$: Observable<{ [name: string]: Setting }>;
  private getDtFormatFromParams: boolean;
  @Input()
  appointment: IAppointment;

  constructor(
    private userSelectors: UserSelectors,
    private systemInfoSelectors: SystemInfoSelectors,
    private settingsAdminSelectors: SettingsAdminSelectors
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.timeConvention$ = this.systemInfoSelectors.systemInfoTimeConvention$;
    this.dateConvention$ = this.systemInfoSelectors.systemInfoDateConvention$;
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
  }

  ngOnInit() {
    const timeConventionSubscription = this.timeConvention$.subscribe(
      timeConvention => this.isMilitaryTime = timeConvention !== 'AMPM'
    );

    const userDirectionSubscription = this.userDirection$.subscribe(
      (userDirection: string) => {
        this.userDirection = userDirection;
      }
    );
    const settingsMapSubscription = this.settingsMap$.subscribe(
      (settingsMap: {[name: string]: Setting }) => {
        this.getDtFormatFromParams = settingsMap.GetSystemParamsDateFormat.value;
      }
    );
    const dateConventionSubscription = this.dateConvention$.subscribe(
      (dateConvention: string) => {
        this.dateFormat = this.getDtFormatFromParams ? (dateConvention || 'dddd MMMM DD YYYY') : 'dddd MMMM DD YYYY';
      }
    );

    this.subscriptions.add(settingsMapSubscription);
    this.subscriptions.add(dateConventionSubscription);
    this.subscriptions.add(timeConventionSubscription);
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

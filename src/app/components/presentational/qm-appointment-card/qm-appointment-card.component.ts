import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import { UserSelectors, SystemInfoSelectors } from '../../../../store';
import { IAppointment } from '../../../../models/IAppointment';

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
  @Input()
  appointment: IAppointment;

  constructor(
    private userSelectors: UserSelectors,
    private systemInfoSelectors: SystemInfoSelectors
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.timeConvention$ = this.systemInfoSelectors.systemInfoTimeConvention$;
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

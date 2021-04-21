import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable ,  Subscription } from 'rxjs';
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
  private dateConvention$: Observable<string>;
  public dateFormat = 'dddd MMMM DD YYYY';
  @Input()
  appointment: IAppointment;

  constructor(
    private userSelectors: UserSelectors,
    private systemInfoSelectors: SystemInfoSelectors
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.timeConvention$ = this.systemInfoSelectors.systemInfoTimeConvention$;
    this.dateConvention$ = this.systemInfoSelectors.systemInfoDateConvention$;
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
    const dateConventionSubscription = this.dateConvention$.subscribe(
      (dateConvention: string) => {
        this.dateFormat = dateConvention || 'dddd MMMM DD YYYY';
      }
    );
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

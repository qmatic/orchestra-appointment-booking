import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { SystemInfoSelectors } from '../../../../store';

@Component({
  selector: 'qm-booking-sidebar',
  templateUrl: './qm-booking-sidebar.component.html',
  styleUrls: ['./qm-booking-sidebar.component.scss']
})
export class QmBookingSidebarComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private timeConvention$: Observable<string>;
  public timeConvention: string;

  @Output()
  optionClicked = new EventEmitter();

  constructor(
    private systemInfoSelectors: SystemInfoSelectors
  ) {
    this.timeConvention$ = this.systemInfoSelectors.systemInfoTimeConvention$;
  }

  ngOnInit() {
    const timeConventionSubscription = this.timeConvention$.subscribe(
      timeConvention => this.timeConvention = timeConvention
    );

    this.subscriptions.add(timeConventionSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  handleClick($event) {
    this.optionClicked.emit($event);
  }
}

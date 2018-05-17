import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SettingsAdminSelectors } from '../../../../store';
import { Setting } from '../../../../models/Setting';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'qm-booking-sidebar',
  templateUrl: './qm-booking-sidebar.component.html',
  styleUrls: ['./qm-booking-sidebar.component.scss']
})
export class QmBookingSidebarComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private settingsMap$: Observable<{ [name: string]: Setting }>;

  private timeFormat: string;

  @Output()
  optionClicked = new EventEmitter();

  constructor(
    private settingsAdminSelectors: SettingsAdminSelectors
  ) {
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
  }

  ngOnInit() {
    const settingsMapSubscription = this.settingsMap$.subscribe(
      (settingsMap: { [name: string]: Setting }) => {
        this.timeFormat = settingsMap.TimeFormat.value;
      }
    );

    this.subscriptions.add(settingsMapSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getTimeformat() {
    return this.timeFormat;
  }

  handleClick($event) {
    this.optionClicked.emit($event);
  }
}

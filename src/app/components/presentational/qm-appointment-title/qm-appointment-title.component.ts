import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import {
  AppointmentMetaSelectors,
  AppointmentMetaDispatchers,
  SettingsAdminSelectors
} from '../../../../store';
import { Setting } from '../../../../models/Setting';

@Component({
  selector: 'qm-appointment-title',
  templateUrl: './qm-appointment-title.component.html',
  styleUrls: ['./qm-appointment-title.component.scss']
})
export class QmAppointmentTitleComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private titleInput$: Subject<string> = new Subject<string>();
  private title$: Observable<string>;
  private settingsMap$: Observable<{[name: string]: Setting}>;

  private titleEnabled: boolean;
  private title: string;

  constructor(
    private appointmentMetaSelectors: AppointmentMetaSelectors,
    private appointmentMetaDispatchers: AppointmentMetaDispatchers,
    private settingsAdminSelectors: SettingsAdminSelectors
  ) {
    this.title$ = this.appointmentMetaSelectors.title$;
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
  }

  ngOnInit() {
    const titleInputSubscription = this.titleInput$.subscribe(
      (title: string) => this.setTitle(title)
    );

    const settingsMapSubscription = this.settingsMap$.subscribe(
      (settingsMap: { [name: string]: Setting }) =>
        this.titleEnabled = settingsMap.Title.value
    );

    this.subscriptions.add(titleInputSubscription);
    this.subscriptions.add(settingsMapSubscription);
  }

  updateTitle(title: string) {
    this.titleInput$.next(title);
  }

  setTitle(title: string) {
    this.appointmentMetaDispatchers.setAppointmentTitle(title);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}

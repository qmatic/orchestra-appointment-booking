import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  UserSelectors,
  AppointmentMetaSelectors,
  AppointmentMetaDispatchers,
  SettingsAdminSelectors
} from '../../../../store';
import { Subscription } from 'rxjs/Subscription';
import { Setting } from '../../../../models/Setting';

@Component({
  selector: 'qm-notify',
  templateUrl: './qm-notify.component.html',
  styleUrls: ['./qm-notify.component.scss'],
})
export class QmNotifyComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private settingsMap$: Observable<{ [name: string]: Setting }>;
  private userDirection$: Observable<string>;
  private notificationType$: Observable<string>;

  private notificationType: string;
  private emailEnabled: boolean;
  private smsEnabled: boolean;
  private emailAndSmsEnabled: boolean;
  private noNotificationEnabled: boolean;

  constructor(
    private userSelectors: UserSelectors,
    private settingsAdminSelectors: SettingsAdminSelectors,
    private appointmentMetaSelectors: AppointmentMetaSelectors,
    private appointmentMetaDispatchers: AppointmentMetaDispatchers
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.notificationType$ = this.appointmentMetaSelectors.notificationType$;
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
  }

  ngOnInit() {
    const notificationTypeSubscription = this.notificationType$.subscribe(
      (notificationType: string) => this.notificationType = notificationType
    );
    const settingsMapSubscription = this.settingsMap$.subscribe(
      (settingsMap: { [name: string]: Setting }) => {
        this.emailEnabled = settingsMap.IncludeEmail.value;
        this.smsEnabled = settingsMap.IncludeSms.value;
        this.emailAndSmsEnabled = settingsMap.IncludeEmailAndSms.value;
        this.noNotificationEnabled = settingsMap.NoNotification.value;
      }
    );

    this.subscriptions.add(notificationTypeSubscription);
    this.subscriptions.add(settingsMapSubscription);
  }

  allNotificationTypesDisabled() {
    return this.emailEnabled === false
          && this.smsEnabled === false
          && this.emailAndSmsEnabled === false
          && this.noNotificationEnabled === false;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  handleClick(notificationType) {
    const isSelected = this.isSelected(notificationType);

    isSelected
      ? this.appointmentMetaDispatchers.resetAppointmentNotificationType()
      : this.appointmentMetaDispatchers.setAppointmentNotificationType(notificationType);
  }

  isSelected(notificationType: string) {
    return this.notificationType === notificationType;
  }
}

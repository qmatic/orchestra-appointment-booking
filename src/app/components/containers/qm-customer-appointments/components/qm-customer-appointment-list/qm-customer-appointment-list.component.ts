import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { IAppointment } from '../../../../../../models/IAppointment';
import { UserSelectors } from '../../../../../../store';


@Component({
  selector: 'qm-customer-appointment-list',
  templateUrl: './qm-customer-appointment-list.component.html',
  styleUrls: ['./qm-customer-appointment-list.component.scss']
})
export class QmCustomerAppointmentListComponent implements OnInit, OnDestroy {
  @Input() appointments: IAppointment[];
  private subscriptions: Subscription = new Subscription();
  private userLocale$: Observable<string>;
  private userLocale: string;

  constructor(
    private userSelectors: UserSelectors
  ) {
    this.userLocale$ = this.userSelectors.userLocale$;
  }

  ngOnInit() {
    const userLocalSubscription = this.userLocale$.subscribe(
      (userLocale: string) => this.userLocale = userLocale
    );
    this.subscriptions.add(userLocalSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

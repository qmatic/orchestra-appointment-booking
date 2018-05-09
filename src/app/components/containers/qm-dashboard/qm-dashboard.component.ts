import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ICustomer } from '../../../../models/ICustomer';
import {
  CustomerSelectors,
  UserSelectors
} from '../../../../store';

@Component({
  selector: 'qm-dashboard',
  templateUrl: './qm-dashboard.component.html',
  styleUrls: ['./qm-dashboard.component.scss'],
})
export class QmDashboardComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  userDirection$: Observable<string>;
  currentCustomer$: Observable<ICustomer>;
  currentCustomer: ICustomer;

  constructor(
    private customerSelectors: CustomerSelectors,
    private userSelectors: UserSelectors
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.currentCustomer$ = this.customerSelectors.currentCustomer$;
  }

  ngOnInit() {
    const currentCustomerSubscription =
        this.currentCustomer$.subscribe(
                (customer: ICustomer) =>
                  this.currentCustomer = customer);

    this.subscriptions.add(currentCustomerSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

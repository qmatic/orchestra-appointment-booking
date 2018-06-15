import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ICustomer } from '../../../../../../models/ICustomer';
import {
  CustomerDispatchers,
  UserSelectors,
  SettingsAdminSelectors
} from '../../../../../../store';
import { Setting } from '../../../../../../models/Setting';

@Component({
  selector: 'qm-customer-search-results',
  templateUrl: './qm-customer-search-results.component.html',
  styleUrls: ['./qm-customer-search-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QmCustomerSearchResultsComponent implements OnInit, OnDestroy {
  @Input() customers: ICustomer[];
  @Input() customersLoading: boolean;
  @Input() customersLoaded: boolean;
  @Input() searchText: string;
  private subscriptions: Subscription = new Subscription();
  private settingsMap$: Observable<{ [name: string]: Setting }>;
  userDirection$: Observable<string>;
  public emailEnabled: boolean;
  public phoneEnabled: boolean;
  public dobEnabled: boolean;

  constructor(
    private userSelectors: UserSelectors,
    private customerDispatchers: CustomerDispatchers,
    private settingsAdminSelectors: SettingsAdminSelectors
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
  }

  ngOnInit() {
    const settingsMapSubscription = this.settingsMap$.subscribe(
      (settings: {[name: string]: Setting}) => {
        this.phoneEnabled = settings.CustomerIncludePhone.value;
        this.emailEnabled = settings.CustomerIncludeEmail.value;
        this.dobEnabled = settings.CustomerIncludeDateofBirth.value;
      }
    );

    this.subscriptions.add(settingsMapSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  showResults() {
    return this.customersLoaded && this.customers.length > 0;
  }

  showNoResults() {
    return this.customersLoaded && this.customers.length === 0;
  }

  showLoading() {
    return !this.customersLoaded && this.customersLoading;
  }

  showComponent() {
    return this.showResults() || this.showNoResults() || this.showLoading();
  }

  selectCustomer(customer: ICustomer) {
    this.customerDispatchers.selectCustomer(customer);
    this.resetSearch();
  }

  resetSearch() {
    this.customerDispatchers.resetCustomers();
    this.customerDispatchers.resetCustomerSearchText();
  }
}

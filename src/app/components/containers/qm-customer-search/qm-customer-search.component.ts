import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  tap
} from 'rxjs/operators';

import {
  CustomerDispatchers,
  CustomerSelectors,
  UserSelectors
} from '../../../../store';

import { ICustomer } from '../../../../models/ICustomer';
import { ToastService } from '../../../../services/util/toast.service';

@Component({
  selector: 'qm-customer-search',
  templateUrl: './qm-customer-search.component.html',
  styleUrls: ['./qm-customer-search.component.scss']
})
export class QmCustomerSearchComponent implements OnDestroy, OnInit {
  private subscriptions: Subscription = new Subscription();
  private searchInput$: Subject<string> = new Subject<string>();
  private userDirection$: Observable<string>;
  private customers$: Observable<ICustomer[]>;
  private customersLoading$: Observable<boolean>;
  private customersLoaded$: Observable<boolean>;
  private searchText$: Observable<string>;
  private CHARACTER_THRESHOLD = 2;
  private customers: ICustomer[];
  private searchText: string;

  constructor(
    private userSelectors: UserSelectors,
    private customerDispatchers: CustomerDispatchers,
    private customersSelectors: CustomerSelectors
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.customers$ = this.customersSelectors.customers$;
    this.searchText$ = this.customersSelectors.searchText$;
    this.customersLoading$ = this.customersSelectors.customersLoading$;
    this.customersLoaded$ = this.customersSelectors.customersLoaded$;
  }

  ngOnInit() {
    const searchInputSubscription = this.searchInput$.pipe(
      tap((val) => this.immidiateActions(val)),
      distinctUntilChanged(),
      debounceTime(1000),
      filter(text => text.length > this.CHARACTER_THRESHOLD),
    ).subscribe((searchText: string) => this.handleCustomerSearch(searchText));

    const customerSubscription = this.customers$.subscribe(
      (customers: ICustomer[]) => this.customers = customers
    );

    const searchTextSubscription = this.searchText$.subscribe(
      (searchText: string) => this.searchText = searchText
    );

    this.subscriptions.add(searchInputSubscription);
    this.subscriptions.add(customerSubscription);
    this.subscriptions.add(searchTextSubscription);
  }

  resetSearch() {
    this.customerDispatchers.resetCustomers();
    this.customerDispatchers.resetCustomerSearchText();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  search (text: string) {
    this.searchInput$.next(text);
  }

  handleCustomerSearch(text: string) {
    this.customerDispatchers.fetchCustomers(text);
  }

  immidiateActions(searchText: string) {
    this.customerDispatchers.updateCustomerSearchText(searchText);
    if (searchText.length <= this.CHARACTER_THRESHOLD) {
      this.customerDispatchers.resetCustomers();
    }
  }
}
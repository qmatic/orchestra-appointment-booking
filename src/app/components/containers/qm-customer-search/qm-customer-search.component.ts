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
  UserSelectors,
  SettingsAdminSelectors
} from '../../../../store';

import { ICustomer } from '../../../../models/ICustomer';
import { ToastService } from '../../../../services/util/toast.service';
import { ModalService } from '../../../../services/util/modal.service';
import { Setting } from '../../../../models/Setting';

@Component({
  selector: 'qm-customer-search',
  templateUrl: './qm-customer-search.component.html',
  styleUrls: ['./qm-customer-search.component.scss']
})
export class QmCustomerSearchComponent implements OnDestroy, OnInit {
  subscriptions: Subscription = new Subscription();
  searchInput$: Subject<string> = new Subject<string>();
  userDirection$: Observable<string>;
  customers$: Observable<ICustomer[]>;
  customersLoading$: Observable<boolean>;
  customersLoaded$: Observable<boolean>;
  searchText$: Observable<string>;
  settingsMap$: Observable<{ [name: string]: Setting }>;
  private CHARACTER_THRESHOLD = 2;
  customers: ICustomer[];
  searchText: string;
  customersLoaded: boolean;
  allowCreateNewCustomer = false;

  constructor(
    private userSelectors: UserSelectors,
    private customerDispatchers: CustomerDispatchers,
    private customersSelectors: CustomerSelectors,
    private settingsAdminSelectors: SettingsAdminSelectors,
    private modalService: ModalService
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.customers$ = this.customersSelectors.customers$;
    this.searchText$ = this.customersSelectors.searchText$;
    this.customersLoading$ = this.customersSelectors.customersLoading$;
    this.customersLoaded$ = this.customersSelectors.customersLoaded$;
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
  }

  ngOnInit() {
    const searchInputSubscription = this.searchInput$.pipe(
      tap((val) => this.immidiateActions(val)),
      distinctUntilChanged(),
      debounceTime(1000),
      filter(text => text.length >= this.CHARACTER_THRESHOLD),
    ).subscribe((searchText: string) => this.handleCustomerSearch(searchText));

    const adminSettingsMapSubscription = this.settingsMap$.subscribe(
      (settingsMap: { [name: string]: Setting }) =>
        this.allowCreateNewCustomer = settingsMap.AllowCreateNewCustomer.value
    );

    const customersLoadedSubscription = this.customersLoaded$.subscribe(
      (customersLoaded: boolean) => this.customersLoaded = customersLoaded
    );

    const customerSubscription = this.customers$.subscribe(
      (customers: ICustomer[]) => this.customers = customers
    );

    const searchTextSubscription = this.searchText$.subscribe(
      (searchText: string) => this.searchText = searchText
    );

    this.subscriptions.add(adminSettingsMapSubscription);
    this.subscriptions.add(searchInputSubscription);
    this.subscriptions.add(customerSubscription);
    this.subscriptions.add(customersLoadedSubscription);
    this.subscriptions.add(searchTextSubscription);
  }

  resetSearch() {
    this.customerDispatchers.resetCustomers();
    this.customerDispatchers.resetCustomerSearchText();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  showBackdrop() {
    return this.customersLoaded;
  }

  search (text: string) {
    this.searchInput$.next(text);
  }

  openCreateCustomer() {
    this.modalService.openCreateCustomerModal();
  }

  handleCustomerSearch(text: string) {
    this.customerDispatchers.fetchCustomers(text);
  }

  immidiateActions(searchText: string) {
    this.customerDispatchers.updateCustomerSearchText(searchText);
    if (searchText.length < this.CHARACTER_THRESHOLD) {
      this.customerDispatchers.resetCustomers();
    }
  }
}

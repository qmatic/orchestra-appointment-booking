import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription ,  Observable ,  Subject } from 'rxjs';
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

import { AutoClose } from './../../../../services/util/autoclose.service';
import { ICustomer } from '../../../../models/ICustomer';
import { ModalService } from '../../../../services/util/modal.service';
import { Setting } from '../../../../models/Setting';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'qm-customer-search',
  templateUrl: './qm-customer-search.component.html',
  styleUrls: ['./qm-customer-search.component.scss']
})
export class QmCustomerSearchComponent implements OnDestroy, OnInit {
  @Input() addButton: boolean;
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
    private modalService: ModalService,
    public autoCloseService: AutoClose,
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.customers$ = this.customersSelectors.customers$;
    this.searchText$ = this.customersSelectors.searchText$;
    this.customersLoading$ = this.customersSelectors.customersLoading$;
    this.customersLoaded$ = this.customersSelectors.customersLoaded$;
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
  }

  ngOnInit() {
    const searchInputSubscription = this.searchInput$
      .pipe(
        tap(val => this.immidiateActions(val)),
        distinctUntilChanged(),
        debounceTime(1000),
        filter(text => text.length >= this.CHARACTER_THRESHOLD)
      )
      .subscribe((searchText: string) => this.handleCustomerSearch(searchText));

    const adminSettingsMapSubscription = this.settingsMap$.subscribe(
      (settingsMap: { [name: string]: Setting }) =>
        (this.allowCreateNewCustomer = settingsMap.AllowCreateNewCustomer.value)
    );

    const customersLoadedSubscription = this.customersLoaded$.subscribe(
      (customersLoaded: boolean) => (this.customersLoaded = customersLoaded)
    );

    const customerSubscription = this.customers$.subscribe(
      (customers: ICustomer[]) => (this.customers = customers)
    );

    const searchTextSubscription = this.searchText$.subscribe(
      (searchText: string) => (this.searchText = searchText)
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

  search(text: string) {
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

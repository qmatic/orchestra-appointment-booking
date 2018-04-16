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
  private subscription: Subscription;
  private searchInput$: Subject<string> = new Subject<string>();
  private userDirection$: Observable<string>;
  private CHARACTER_THRESHOLD = 2;

  @Input() private searchText: string;
  @Input() private customers: ICustomer[];

  constructor(
    private userSelectors: UserSelectors,
    private customerDispatchers: CustomerDispatchers
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
  }

  ngOnInit() {
    this.subscription = this.searchInput$.pipe(
      tap((val) => this.immidiateActions(val)),
      distinctUntilChanged(),
      debounceTime(1000),
      filter(text => text.length > this.CHARACTER_THRESHOLD),
    ).subscribe(searchText => this.handleCustomerSearch(searchText));
  }

  resetSearch() {
    this.customerDispatchers.resetCustomers();
    this.customerDispatchers.resetCustomerSearchText();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

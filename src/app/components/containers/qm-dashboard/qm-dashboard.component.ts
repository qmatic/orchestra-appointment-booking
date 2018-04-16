import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { IBranch } from '../../../../models/IBranch';
import { ICustomer } from '../../../../models/ICustomer';
import {
  BranchSelectors,
  BranchDispatchers,
  CustomerSelectors,
  UserSelectors
} from '../../../../store';

@Component({
  selector: 'qm-dashboard',
  templateUrl: './qm-dashboard.component.html',
  styleUrls: ['./qm-dashboard.component.scss']
})
export class QmDashboardComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private branches$: Observable<IBranch[]>;
  private customers$: Observable<ICustomer[]>;
  private userDirection$: Observable<string>;
  private customerSearchText$: Observable<string>;
  private currentCustomer$: Observable<ICustomer>;
  private currentCustomer: ICustomer;

  // Dim mock data
  private services: Array<any>;

  constructor(
    private branchSelectors: BranchSelectors,
    private branchDispatchers: BranchDispatchers,
    private customerSelectors: CustomerSelectors,
    private userSelectors: UserSelectors
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.branches$ = this.branchSelectors.filteredBranches$;
    this.customerSearchText$ = this.customerSelectors.getSearchText$;
    this.customers$ = this.customerSelectors.customers$;
    this.currentCustomer$ = this.customerSelectors.currentCustomer$;

    // Dim mock data
    this.services = [{name: 'AR/VR Demo'}, {name: 'Car alarm system'}, {name: 'Extended warranty'}];
  }

  ngOnInit() {
    this.subscription =
        this.currentCustomer$.subscribe(
                (customer: ICustomer) =>
                  this.currentCustomer = customer);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  branchSearch(searchText) {
    this.branchDispatchers.filter(searchText);
  }

  serviceSearch(searchText) {
    // tslint:disable-next-line:no-trailing-whitespace

  }

  handleBranchSelection(branch: IBranch) {
    branch.isSelected = !branch.isSelected;
  }
}

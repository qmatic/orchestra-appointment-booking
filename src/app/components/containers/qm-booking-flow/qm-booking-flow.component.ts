import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  ServiceSelectors,
  ServiceDispatchers,
  BranchSelectors,
  BranchDispatchers,
  SettingsAdminSelectors} from '../../../../store';
import { IBranch } from '../../../../models/IBranch';
import { IService } from '../../../../models/IService';
import { Subscription } from 'rxjs/Subscription';
import { Setting } from '../../../../models/Setting';
import { NumberOfCustomersSelectors } from '../../../../store/services/number-of-customers/number-of-customers.selectors';
import { NumberOfCustomersDispatchers } from '../../../../store/services/number-of-customers/number-of-customers.dispatchers';

@Component({
  selector: 'qm-booking-flow',
  templateUrl: './qm-booking-flow.component.html',
  styleUrls: ['./qm-booking-flow.component.scss']
})
export class QmBookingFlowComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private branches$: Observable<IBranch[]>;
  private selectedBranches$: Observable<IBranch[]>;
  private branchesSearchText$: Observable<string>;
  private services$: Observable<IService[]>;
  private servicesSearchText$: Observable<string>;
  private selectedServices$: Observable<IService[]>;
  private settingsMap$: Observable<{ [name: string]: Setting }>;
  private numberOfCustomers$: Observable<number>;

  private branches: IBranch[];
  private selectedServices: IService[];
  private selectedBranches: IBranch[];
  private settingsMap: { [name: string ]: Setting };
  private numberOfCustomers: number;

  constructor(
    private branchSelectors: BranchSelectors,
    private branchDispatchers: BranchDispatchers,
    private serviceSelectors: ServiceSelectors,
    private serviceDispatchers: ServiceDispatchers,
    private settingsAdminSelectors: SettingsAdminSelectors,
    private numberOfCustomersSelectors: NumberOfCustomersSelectors,
    private numberOfCustomersDispatchers: NumberOfCustomersDispatchers
  ) {
    this.branches$ = this.branchSelectors.visibleBranches$;
    this.branchesSearchText$ = this.branchSelectors.searchText$;
    this.selectedBranches$ = this.branchSelectors.selectedBranch$;
    this.services$ = this.serviceSelectors.visibleServices$;
    this.servicesSearchText$ = this.serviceSelectors.searchText$;
    this.selectedServices$ = this.serviceSelectors.selectedServices$;
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
    this.numberOfCustomers$ = this.numberOfCustomersSelectors.numberOfCustomers$;
  }

  ngOnInit() {
    const branchSubscription = this.branches$.subscribe(
      (branches: IBranch[]) => this.branches = branches
    );

    const selectedServicesSubscription = this.selectedServices$.subscribe(
      (selectedServices: IService[]) => this.selectedServices = selectedServices
    );

    const selectedBranchesSubscription = this.selectedBranches$.subscribe(
      (selectedBranches: IBranch[]) => this.selectedBranches = selectedBranches
    );

    const settingsSubscription = this.settingsMap$.subscribe(
      (settingsMap: { [name: string]: Setting }) => this.settingsMap = settingsMap
    );

    const numberOfCustomersSubscription = this.numberOfCustomers$.subscribe(
      (selectedNumberOfCustomers: number) => this.numberOfCustomers = selectedNumberOfCustomers
    );

    this.subscriptions.add(branchSubscription);
    this.subscriptions.add(selectedServicesSubscription);
    this.subscriptions.add(selectedBranchesSubscription);
    this.subscriptions.add(settingsSubscription);
    this.subscriptions.add(numberOfCustomersSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getInputTypeForServices(): string {
    const multiServicesEnabled = this.settingsMap.AllowMultiService.value;
    if (multiServicesEnabled) {
      return 'checkbox';
    } else {
      return 'radio';
    }
  }

  filterBranches(searchText: string) {
    this.branchDispatchers.filterBranches(searchText);
  }

  handleBranchSelection(branch: IBranch) {
    const isSelected = this.isBranchSelected(branch);

    if (isSelected) {
      this.branchDispatchers.deselectBranch(branch);
    } else {
      this.branchDispatchers.selectBranch(branch);
    }
  }

  filterServices(searchText: string) {
    this.serviceDispatchers.filterServices(searchText);
  }

  handleServiceSelection(service: IService) {
    const isSelected = this.isServiceSelected(service);

    if (isSelected) {
      this.serviceDispatchers.deselectService(service);
    } else {
      const multiServicesEnabled = this.settingsMap.AllowMultiService.value;

      multiServicesEnabled
        ? this.serviceDispatchers.selectMultiService(service)
        : this.serviceDispatchers.selectService(service);
    }

    this.updateServiceGroups();
  }

  getSelectableAmountOfCustomers() {
    const shouldSetToOne = this.shouldSetNumberOfCustomersToOne();
    if (shouldSetToOne) {
      return this.createNumberOfCustomersArray(1);
    } else {
      const maxNumberOfCustomers = this.settingsMap.MaxCustomers.value;
      return this.createNumberOfCustomersArray(maxNumberOfCustomers);
    }
  }

  createNumberOfCustomersArray(maxNumberOfCustomers: number): Array<number> {
    return Array.from({length: maxNumberOfCustomers}, (v, k) => k + 1);
  }

  handleNumberOfCustomersSelection(numberOfCustomers: number) {
    const isSelected = this.isNumberOfCustomerSelected(numberOfCustomers);

    isSelected
      ? this.numberOfCustomersDispatchers.resetNumberOfCustomers()
      : this.numberOfCustomersDispatchers.setNumberOfCustomers(numberOfCustomers);

  }

  updateServiceGroups() {
    const queryString = this.getServicesQueryString();
    this.serviceDispatchers.fetchServiceGroups(queryString);
  }

  getServicesQueryString(): string {
    return this.selectedServices.reduce(
      (queryString, service: IService) => {
        return queryString + `;servicePublicId=${service.publicId}`;
      }, '');
  }

  shouldSetNumberOfCustomersToOne() {
    return this.selectedServices.reduce(
      (shouldSetToOne: boolean, selectedService: IService) => {
        return !shouldSetToOne
                ? selectedService.additionalCustomerDuration === 0
                : true;
      },
      false
    );
  }

  isNumberOfCustomerSelected(numberOfCustomers: number) {
    return this.numberOfCustomers === numberOfCustomers;
  }

  isServiceSelected(service: IService): boolean {
    return this.selectedServices.reduce(
      (acc: boolean, curr: IService) => {
        return !acc ? curr.publicId === service.publicId : acc;
      }, false);
  }

  isBranchSelected(branch: IBranch): boolean {
    return this.selectedBranches.reduce(
      (acc: boolean, curr: IBranch) => {
        return !acc ? curr.publicId === branch.publicId : acc;
      }, false);
  }
}

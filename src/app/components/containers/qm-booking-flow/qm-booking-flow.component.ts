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

  private branches: IBranch[];
  private selectedServices: IService[];
  private selectedBranches: IBranch[];
  private settingsMap: { [name: string ]: Setting };

  constructor(
    private branchSelectors: BranchSelectors,
    private branchDispatchers: BranchDispatchers,
    private serviceSelectors: ServiceSelectors,
    private serviceDispatchers: ServiceDispatchers,
    private settingsAdminSelectors: SettingsAdminSelectors
  ) {
    this.branches$ = this.branchSelectors.visibleBranches$;
    this.branchesSearchText$ = this.branchSelectors.searchText$;
    this.selectedBranches$ = this.branchSelectors.selectedBranch$;
    this.services$ = this.serviceSelectors.visibleServices$;
    this.servicesSearchText$ = this.serviceSelectors.searchText$;
    this.selectedServices$ = this.serviceSelectors.selectedServices$;
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
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

    this.subscriptions.add(branchSubscription);
    this.subscriptions.add(selectedServicesSubscription);
    this.subscriptions.add(selectedBranchesSubscription);
    this.subscriptions.add(settingsSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getInputTypeForServices(): string {
    const multiServicesEnabled = this.settingsMap.AllowMultiService.value;
    console.log('multiServiceEnabled: ', multiServicesEnabled);
    console.log('typof', typeof multiServicesEnabled);
    if (multiServicesEnabled) {
      return 'checkbox';
    } else {
      return 'radio';
    }
  }

  filterBranches(searchText: string) {
    this.branchDispatchers.filterBranches(searchText);
    console.log('this is the settingsMap: ', this.settingsMap);
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

  updateServiceGroups() {
    const queryString = this.getServicesQueryString();
    this.serviceDispatchers.fetchServiceGroups(queryString);
  }

  getServicesQueryString(): string {
    return this.selectedServices.reduce(
      (acc, service: IService) => {
        return acc + `;servicePublicId=${service.publicId}`;
      }, '');
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

import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ServiceSelectors, ServiceDispatchers, BookingSelectors } from '../../../../store';
import { Setting } from '../../../../models/Setting';
import { IService } from '../../../../models/IService';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { BookingHelperService } from '../../../../services/util/bookingHelper.service';
import { IAppointment } from '../../../../models/IAppointment';

@Component({
  selector: 'qm-service-booker',
  templateUrl: './qm-service-booker.component.html',
  styleUrls: ['./qm-service-booker.component.scss'],
})
export class QmServiceBookerComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();

  @Input()
  userDirection: string;

  @Input()
  settingsMap: { [name: string]: Setting };

  public services$: Observable<IService[]>;
  public servicesSearchText: string;
  private servicesSearchText$: Observable<string>;
  private selectedServices$: Observable<IService[]>;
  private selectedServices: IService[];
  public bookedAppointment$: Observable<IAppointment>;


  constructor(
    private serviceSelectors: ServiceSelectors,
    private serviceDispatchers: ServiceDispatchers,
    private bookingHelperService: BookingHelperService,
    private bookingSelectors: BookingSelectors
  ) {
    this.services$ = this.serviceSelectors.visibleServices$;
    this.servicesSearchText$ = this.serviceSelectors.searchText$;
    this.selectedServices$ = this.serviceSelectors.selectedServices$;
    this.bookedAppointment$ = this.bookingSelectors.bookedAppointment$;
  }

  ngOnInit() {

    const searchTextSubscription = this.servicesSearchText$.subscribe(
      (searchText: string) => {
        this.servicesSearchText = searchText;
      }
    );

    const selectedServicesSubscription = this.selectedServices$.subscribe(
      (selectedServices: IService[]) => {
          this.selectedServices = selectedServices;
          this.updateServiceGroups();
          this.resetSearchText();
        }
    );

    this.subscriptions.add(searchTextSubscription);
    this.subscriptions.add(selectedServicesSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  /***************/
  /*   SERVICES  */
  /***************/

  /**
   * Get the input type for the services list
   */
  getInputTypeForServices(): string {
    const multiServicesEnabled = this.settingsMap.AllowMultiService.value;
    if (multiServicesEnabled) {
      return 'checkbox';
    } else {
      return 'radio';
    }
  }

  /**
   * Filter services
   * @param searchText - Search string
   */
  filterServices(searchText: string) {
    this.serviceDispatchers.filterServices(searchText);
  }

  /**
   * Click handler for service list
   * @param service - Selected service
   */
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
  }

  resetSearchText() {
    const hasText = this.servicesSearchText.length > 0;
    if (hasText === true) {
      this.serviceDispatchers.resetFilterServices();
    }
  }

  /**
   * Update the service groups
   * Used to display related services and available branches
   */
  updateServiceGroups() {
    const queryString = this.bookingHelperService.getServicesQueryString();
    this.serviceDispatchers.fetchServiceGroups(queryString);
  }

  /**
   * Check if provided service is in selected services array
   * @param service - Provided service
   */
  isServiceSelected(service: IService): boolean {
    return this.selectedServices.reduce((acc: boolean, curr: IService) => {
      return !acc ? curr.publicId === service.publicId : acc;
    }, false);
  }
}

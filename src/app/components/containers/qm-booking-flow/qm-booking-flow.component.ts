import { CalendarSettingsSelectors } from './../../../../store/services/calendar-settings/calendar-settings.selectors';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  ServiceSelectors,
  ServiceDispatchers,
  BranchSelectors,
  BranchDispatchers,
  SettingsAdminSelectors,
  DateSelectors,
  DateDispatchers,
  UserSelectors,
  TimeslotSelectors,
  TimeslotDispatchers,
  ReserveDispatchers,
  CustomerSelectors,
  AppointmentMetaSelectors,
  ReserveSelectors
} from '../../../../store';
import { IBranch } from '../../../../models/IBranch';
import { IService } from '../../../../models/IService';
import { Subscription } from 'rxjs/Subscription';
import { Setting } from '../../../../models/Setting';
import { NumberOfCustomersSelectors } from '../../../../store/services/number-of-customers/number-of-customers.selectors';
import { NumberOfCustomersDispatchers } from '../../../../store/services/number-of-customers/number-of-customers.dispatchers';
import { IBookingInformation } from '../../../../models/IBookingInformation';
import { IAppointment } from '../../../../models/IAppointment';
import { ICustomer } from '../../../../models/ICustomer';

@Component({
  selector: 'qm-booking-flow',
  templateUrl: './qm-booking-flow.component.html',
  styleUrls: ['./qm-booking-flow.component.scss']
})
export class QmBookingFlowComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private services$: Observable<IService[]>;
  private selectedServices$: Observable<IService[]>;
  servicesSearchText$: Observable<string>;
  private numberOfCustomers$: Observable<number>;
  private numberOfCustomersArray$: Observable<number[]>;
  private branches$: Observable<IBranch[]>;
  private selectedBranches$: Observable<IBranch[]>;
  branchesSearchText$: Observable<string>;
  dates$: Observable<string[]>;
  private selectedDate$: Observable<string>;
  datesSearchText$: Observable<string>;
  times$: Observable<string[]>;
  private selectedTime$: Observable<string>;
  private settingsMap$: Observable<{ [name: string]: Setting }>;
  private userLocale$: Observable<string>;
  private currentCustomer$: Observable<ICustomer>;
  private notes$: Observable<string>;
  private title$: Observable<string>;
  private reservedAppointment$: Observable<IAppointment>;

  public services: IService[];
  public branches: IBranch[];
  public dates: string[];
  public times: string[];
  private selectedServices: IService[];
  private selectedBranches: IBranch[];
  private settingsMap: { [name: string]: Setting };
  private numberOfCustomers: number;
  private userLocale: string;
  private selectedDate: string;
  private selectedTime: string;
  private currentCustomer: ICustomer;
  private notes: string;
  private title: string;
  private reservedAppointment: IAppointment;

  constructor(
    private branchSelectors: BranchSelectors,
    private branchDispatchers: BranchDispatchers,
    private serviceSelectors: ServiceSelectors,
    private serviceDispatchers: ServiceDispatchers,
    private settingsAdminSelectors: SettingsAdminSelectors,
    private numberOfCustomersSelectors: NumberOfCustomersSelectors,
    private numberOfCustomersDispatchers: NumberOfCustomersDispatchers,
    private dateSelectors: DateSelectors,
    private dateDispatchers: DateDispatchers,
    private userSelectors: UserSelectors,
    private timeslotSelectors: TimeslotSelectors,
    private timeslotDispatchers: TimeslotDispatchers,
    private reserveDispatchers: ReserveDispatchers,
    private customerSelectors: CustomerSelectors,
    private appointmentMetaSelectors: AppointmentMetaSelectors,
    private calendarSettingsSelectors: CalendarSettingsSelectors,
    private reserveSelectors: ReserveSelectors
  ) {
    this.branches$ = this.branchSelectors.visibleBranches$;
    this.branchesSearchText$ = this.branchSelectors.searchText$;
    this.selectedBranches$ = this.branchSelectors.selectedBranch$;
    this.services$ = this.serviceSelectors.visibleServices$;
    this.servicesSearchText$ = this.serviceSelectors.searchText$;
    this.selectedServices$ = this.serviceSelectors.selectedServices$;
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
    this.numberOfCustomers$ = this.numberOfCustomersSelectors.numberOfCustomers$;
    this.numberOfCustomersArray$ = this.numberOfCustomersSelectors.numberOfCustomersArray$;
    this.dates$ = this.dateSelectors.visibleDates$;
    this.datesSearchText$ = this.dateSelectors.searchText$;
    this.times$ = this.timeslotSelectors.times$;
    this.selectedDate$ = this.dateSelectors.selectedDate$;
    this.selectedTime$ = this.timeslotSelectors.selectedTime$;
    this.userLocale$ = this.userSelectors.userLocale$;
    this.currentCustomer$ = this.customerSelectors.currentCustomer$;
    this.title$ = this.appointmentMetaSelectors.title$;
    this.notes$ = this.appointmentMetaSelectors.notes$;
    this.reservedAppointment$ = this.reserveSelectors.reservedAppointment$;
  }

  ngOnInit() {
    const titleSubscription = this.title$.subscribe(
      (title: string) => (this.title = title)
    );

    const notesSubscription = this.notes$.subscribe(
      (notes: string) => (this.notes = notes)
    );

    const servicesSubscription = this.services$.subscribe(
      (services: IService[]) => (this.services = services)
    );

    const branchSubscription = this.branches$.subscribe(
      (branches: IBranch[]) => (this.branches = branches)
    );

    const datesSubscription = this.dates$.subscribe(
      (dates: string[]) => (this.dates = dates)
    );

    const timesSubscription = this.times$.subscribe(
      (times: string[]) => (this.times = times)
    );

    const currentCustomerSubscription = this.currentCustomer$.subscribe(
      (currentCustomer: ICustomer) => (this.currentCustomer = currentCustomer)
    );

    const userLocaleSubscription = this.userLocale$.subscribe(
      (userLocale: string) => (this.userLocale = userLocale)
    );

    const selectedServicesSubscription = this.selectedServices$.subscribe(
      (selectedServices: IService[]) =>
        (this.selectedServices = selectedServices)
    );

    const selectedBranchesSubscription = this.selectedBranches$.subscribe(
      (selectedBranches: IBranch[]) =>
        (this.selectedBranches = selectedBranches)
    );

    const settingsSubscription = this.settingsMap$.subscribe(
      (settingsMap: { [name: string]: Setting }) =>
        (this.settingsMap = settingsMap)
    );

    const numberOfCustomersSubscription = this.numberOfCustomers$.subscribe(
      (selectedNumberOfCustomers: number) =>
        (this.numberOfCustomers = selectedNumberOfCustomers)
    );

    const selectedDateSubscription = this.selectedDate$.subscribe(
      (selectedDate: string) => (this.selectedDate = selectedDate)
    );

    const selectedTimeslotSubscription = this.selectedTime$.subscribe(
      (selectedTime: string) => (this.selectedTime = selectedTime)
    );

    const numberOfCustomersArraySubscription = this.numberOfCustomersArray$.subscribe(
      (numberOfCustomersArray: number[]) =>
        this.numberOfCustomersDispatchers.setNumberOfCustomers(1)
    );

    const reservedAppointmentSubscription = this.reservedAppointment$.subscribe(
      (reservedAppointment: IAppointment) => this.reservedAppointment = reservedAppointment
    );

    this.subscriptions.add(titleSubscription);
    this.subscriptions.add(notesSubscription);
    this.subscriptions.add(servicesSubscription);
    this.subscriptions.add(userLocaleSubscription);
    this.subscriptions.add(currentCustomerSubscription);
    this.subscriptions.add(branchSubscription);
    this.subscriptions.add(datesSubscription);
    this.subscriptions.add(timesSubscription);
    this.subscriptions.add(selectedServicesSubscription);
    this.subscriptions.add(selectedBranchesSubscription);
    this.subscriptions.add(settingsSubscription);
    this.subscriptions.add(numberOfCustomersSubscription);
    this.subscriptions.add(numberOfCustomersArraySubscription);
    this.subscriptions.add(selectedDateSubscription);
    this.subscriptions.add(selectedTimeslotSubscription);
    this.subscriptions.add(reservedAppointmentSubscription);
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

    this.updateServiceGroups();
  }

  /**
   * Update the service groups
   * Used to display related services and available branches
   */
  updateServiceGroups() {
    const queryString = this.getServicesQueryString();
    this.serviceDispatchers.fetchServiceGroups(queryString);
  }

  /**
   * Generate query string of selected services
   */
  getServicesQueryString(): string {
    return this.selectedServices.reduce((queryString, service: IService) => {
      return queryString + `;servicePublicId=${service.publicId}`;
    }, '');
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

  /**************************/
  /*   NUMBER OF CUSTOMERS  */
  /**************************/

  /**
   * Click handler for number of customers selection
   * @param numberOfCustomers - Clicked number of customers
   */
  handleNumberOfCustomersSelection(numberOfCustomers: number) {
    const isSelected = this.isNumberOfCustomerSelected(numberOfCustomers);

    isSelected
      ? this.numberOfCustomersDispatchers.resetNumberOfCustomers()
      : this.numberOfCustomersDispatchers.setNumberOfCustomers(
          numberOfCustomers
        );
  }

  /**
   * Check if provided number of customers already is the selected number of customers
   * @param numberOfCustomers - Provided number of customers
   */
  isNumberOfCustomerSelected(numberOfCustomers: number) {
    return this.numberOfCustomers === numberOfCustomers;
  }

  /**
   * Decide if customer column should be rendered.
   */
  shouldShowCustomerColumn() {
    return this.settingsMap.MaxCustomers.value > 1;
  }

  /***************/
  /*   BRANCHES  */
  /***************/

  /**
   * Filter branches
   * @param searchText - Search string
   */
  filterBranches(searchText: string) {
    this.branchDispatchers.filterBranches(searchText);
  }

  getBranchAddressText(branch: IBranch) {
    let completeAddress = '';
    if (branch) {
      const address = branch.addressLine1;
      const city = branch.addressCity;

      if (address !== '') {
        completeAddress += address;
      }
      if (city !== '') {
        if (address !== '') {
          completeAddress += ', ';
        }
        completeAddress += city;
      }
    }

    return completeAddress;
  }

  /**
   * Click handler for branch selection
   * @param branch - Selected branch
   */
  handleBranchSelection(branch: IBranch) {
    const isSelected = this.isBranchSelected(branch);

    if (isSelected) {
      this.branchDispatchers.deselectBranch();
    } else {
      this.branchDispatchers.selectBranch(branch);
      this.getDates();
    }
  }

  /**
   * Getting the dates and populating the dates array
   * when a branch is selected
   */
  getDates() {
    const serviceQuery = this.getServicesQueryString();
    const branchPublicId = this.selectedBranches[0].publicId;
    const numberOfCustomers = this.numberOfCustomers;

    const bookingInformation: IBookingInformation = {
      serviceQuery,
      branchPublicId,
      numberOfCustomers
    };

    this.dateDispatchers.getDates(bookingInformation);
  }

  /**
   * Checks if provided branch is in selected branches array
   * @param branch - Provided branch
   */
  isBranchSelected(branch: IBranch): boolean {
    return this.selectedBranches.reduce((acc: boolean, curr: IBranch) => {
      return !acc ? curr.publicId === branch.publicId : acc;
    }, false);
  }

  /************/
  /*   DATES  */
  /************/

  /**
   * Click handler for date selection
   * @param date - Selected date
   */
  handleDateSelection(date: string) {
    const isSelected = this.isDateSelected(date);

    if (isSelected) {
      this.dateDispatchers.deselectDate();
    } else {
      this.dateDispatchers.selectDate(date);
      this.getTimeslots();
    }
  }

  /**
   * Filter dates
   * @param searchText - Search string
   */
  filterDates(searchText: string) {
    this.dateDispatchers.filterDates(searchText);
  }

  /**
   * Populate timeslots when date is selected
   */
  getTimeslots() {
    const serviceQuery = this.getServicesQueryString();
    const branchPublicId = this.selectedBranches[0].publicId;
    const numberOfCustomers = this.numberOfCustomers;
    const date = this.selectedDate.slice(0, 10);

    const bookingInformation: IBookingInformation = {
      serviceQuery,
      branchPublicId,
      numberOfCustomers,
      date
    };

    this.timeslotDispatchers.getTimeslots(bookingInformation);
  }

  /**
   * Check if provided date already is the selected date
   * @param date - Provided date
   */
  isDateSelected(date: string): boolean {
    return this.selectedDate === date;
  }

  /************/
  /*   TIMES  */
  /************/

  /**
   * Click handler for time selection
   * @param timeslot - Selected time
   */
  handleTimeslotSelection(timeslot: string) {
    const isSelected = this.isTimeslotSelected(timeslot);

    if (isSelected) {
      this.timeslotDispatchers.deselectTimeslot();
    } else {
      this.timeslotDispatchers.selectTimeslot(timeslot);
      this.reserveAppointment();
    }
  }

  /**
   * Reserve appointment - Work in progress - might be moved to service
   */
  reserveAppointment() {
    const branchPublicId = this.selectedBranches[0].publicId;
    const date = this.selectedDate.slice(0, 10);
    const time = this.selectedTime;
    const numberOfCustomers = this.numberOfCustomers;

    const bookingInformation: IBookingInformation = {
      branchPublicId,
      date,
      time,
      numberOfCustomers
    };

    const appointment: IAppointment = {
      services: this.selectedServices,
      customers: [this.currentCustomer],
      title: this.title,
      notes: this.notes
    };

    this.reserveDispatchers.reserveAppointment(bookingInformation, appointment);
  }

  /**
   * Check if provided time is already the selected time
   * @param time - Provided time
   */
  isTimeslotSelected(time: string) {
    return this.selectedTime === time;
  }


  /************/
  /*   MISC   */
  /************/

  getResource() {
    let resource = '';
    if (this.reservedAppointment !== null) {
      resource = this.reservedAppointment.resource.name;
    }
    return resource;
  }
}

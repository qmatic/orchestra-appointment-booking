import { Injectable, Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { BookingHelperSelectors } from '../../store';
import { IService } from '../../models/IService';
import { IBranch } from '../../models/IBranch';
import { IBookingInformation } from '../../models/IBookingInformation';
import { IAppointment } from '../../models/IAppointment';
import { ICustomer } from '../../models/ICustomer';


@Injectable()
export class BookingHelperService implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private currentCustomer$: Observable<ICustomer>;
  private selectedServices$: Observable<IService[]>;
  private selectedNumberOfCustomers$: Observable<number>;
  private selectedBranches$: Observable<IBranch[]>;
  private selectedDate$: Observable<string>;
  private selectedTime$: Observable<string>;
  private title$: Observable<string>;
  private notes$: Observable<string>;

  private currentCustomer: ICustomer;
  private selectedServices: IService[];
  private selectedNumberOfCustomers: number;
  private selectedBranches: IBranch[];
  private selectedDate: string;
  private selectedTime: string;
  private title: string;
  private notes: string;

  constructor(
    private bookingHelperSelectors: BookingHelperSelectors,
  ) {
    this.currentCustomer$ = this.bookingHelperSelectors.currentCustomer$;
    this.selectedServices$ = this.bookingHelperSelectors.selectedServices$;
    this.selectedNumberOfCustomers$ = this.bookingHelperSelectors.selectedNumberOfCustomers$;
    this.selectedBranches$ = this.bookingHelperSelectors.selectedBranch$;
    this.selectedDate$ = this.bookingHelperSelectors.selectedDate$;
    this.selectedTime$ = this.bookingHelperSelectors.selectedTime$;
    this.title$ = this.bookingHelperSelectors.title$;
    this.notes$ = this.bookingHelperSelectors.notes$;
    this.setupSubcriptions();
  }

  setupSubcriptions() {
    const currentCustomerSubscription = this.currentCustomer$.subscribe(
      (currentCustomer: ICustomer) => {
        this.currentCustomer = currentCustomer;
      }
    );

    const selectedServicesSubscription = this.selectedServices$.subscribe(
      (selectedServices: IService[]) => {
        this.selectedServices = selectedServices;
      }
    );

    const selectedNumberOfCustomersSubscription = this.selectedNumberOfCustomers$.subscribe(
      (selectedNumberOfCustomers: number) => {
        this.selectedNumberOfCustomers = selectedNumberOfCustomers;
      }
    );

    const selectedBranchesSubscription = this.selectedBranches$.subscribe(
      (selectedBranches: IBranch[]) => {
        this.selectedBranches = selectedBranches;
      }
    );

    const selectedDateSubscription = this.selectedDate$.subscribe(
      (selectedDate: string) => {
        this.selectedDate = selectedDate;
      }
    );

    const selectedTimeSubscription = this.selectedTime$.subscribe(
      (selectedTime: string) => {
        this.selectedTime = selectedTime;
      }
    );

    const titleSubscription = this.title$.subscribe(
      (title: string) => {
        this.title = title;
      }
    );

    const notesSubscription = this.notes$.subscribe(
      (notes: string) => {
        this.notes = notes;
      }
    );

    this.subscriptions.add(currentCustomerSubscription);
    this.subscriptions.add(selectedServicesSubscription);
    this.subscriptions.add(selectedNumberOfCustomersSubscription);
    this.subscriptions.add(selectedBranchesSubscription);
    this.subscriptions.add(selectedDateSubscription);
    this.subscriptions.add(selectedTimeSubscription);
    this.subscriptions.add(titleSubscription);
    this.subscriptions.add(notesSubscription);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getSelectedServices() {
    return this.selectedServices;
  }

  getSelectedNumberOfCustomers() {
    return this.selectedNumberOfCustomers;
  }

  getSelectedBranches() {
    return this.selectedBranches;
  }

  getSelectedDate() {
    return this.selectedDate;
  }

  getSelectedTime() {
    return this.selectedTime;
  }

  getNotes() {
    return this.notes;
  }

  getTitle() {
    return this.title;
  }

  getServicesQueryString(): string {
    return this.selectedServices.reduce((queryString, service: IService) => {
      return queryString + `;servicePublicId=${service.publicId}`;
    }, '');
  }

  getBookingInformation(): IBookingInformation {
    const serviceQuery = this.getServicesQueryString();
    const branchPublicId = this.selectedBranches[0].publicId;
    const date = this.selectedDate.slice(0, 10);
    const time = this.selectedTime;
    const numberOfCustomers = this.selectedNumberOfCustomers;

    const bookingInformation: IBookingInformation = {
      serviceQuery,
      branchPublicId,
      date,
      time,
      numberOfCustomers
    };

    return bookingInformation;
  }

  getAppointmentInformation(): IAppointment {
    const appointment: IAppointment = {
      services: this.selectedServices,
      customers: [this.currentCustomer],
      title: this.title,
      notes: this.notes
    };

    return appointment;
  }
}

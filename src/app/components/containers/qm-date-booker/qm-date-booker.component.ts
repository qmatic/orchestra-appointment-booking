import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { DateSelectors, DateDispatchers, BookingHelperSelectors, TimeslotDispatchers, ReserveSelectors } from '../../../../store';
import { BookingHelperService } from '../../../../services/util/bookingHelper.service';
import { IBookingInformation } from '../../../../models/IBookingInformation';
import { IAppointment } from '../../../../models/IAppointment';

@Component({
  selector: 'qm-date-booker',
  templateUrl: './qm-date-booker.component.html',
  styleUrls: ['./qm-date-booker.component.scss'],
})
export class QmDateBookerComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();

  @Input()
  userDirection: string;

  public datesSearchText$: Observable<string>;
  public resourceName = '';

  public dates$: Observable<string[]>;
  private selectedDate$: Observable<string>;
  private reservedAppointment$: Observable<IAppointment>;
  private selectedDate: string;
  private reservedAppointment: IAppointment;

  constructor(
    private dateSelectors: DateSelectors,
    private dateDispatchers: DateDispatchers,
    private timeslotDispatchers: TimeslotDispatchers,
    private bookingHelperSelectors: BookingHelperSelectors,
    private bookingHelperService: BookingHelperService,
    private reserveSelectors: ReserveSelectors
  ) {
    this.dates$ = this.dateSelectors.visibleDates$;
    this.datesSearchText$ = this.dateSelectors.searchText$;
    this.selectedDate$ = this.bookingHelperSelectors.selectedDate$;
    this.reservedAppointment$ = this.reserveSelectors.reservedAppointment$;
  }

  ngOnInit() {
    const selectedDateSubscription = this.selectedDate$.subscribe(
      (selectedDate: string) => {
        this.selectedDate = selectedDate;
      }
    );

    const reservedAppointmentSubscription = this.reservedAppointment$.subscribe(
      (reservedAppointment: IAppointment) => {
        this.reservedAppointment = reservedAppointment;
        this.setResourceName();
      }
    );

    this.subscriptions.add(selectedDateSubscription);
    this.subscriptions.add(reservedAppointmentSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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
    // const serviceQuery = this.bookingHelperService.getServicesQueryString();
    // const branchPublicId = this.bookingHelperService.getSelectedBranches()[0].publicId;
    // const numberOfCustomers = this.bookingHelperService.getSelectedNumberOfCustomers();
    // const date = this.selectedDate.slice(0, 10);

    // const bookingInformation: IBookingInformation = {
    //   serviceQuery,
    //   branchPublicId,
    //   numberOfCustomers,
    //   date
    // };

    const bookingInformation: IBookingInformation = this.bookingHelperService.getBookingInformation();
    this.timeslotDispatchers.getTimeslots(bookingInformation);
  }

  /**
   * Check if provided date already is the selected date
   * @param date - Provided date
   */
  isDateSelected(date: string): boolean {
    return this.selectedDate === date;
  }

  setResourceName() {
    if (this.reservedAppointment !== null && this.reservedAppointment.resource) {
      this.resourceName = this.reservedAppointment.resource.name;
    } else {
      this.resourceName = '';
    }
  }
}

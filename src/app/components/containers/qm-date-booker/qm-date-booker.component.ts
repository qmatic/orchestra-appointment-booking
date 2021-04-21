import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable ,  Subscription } from 'rxjs';
import { DateSelectors, DateDispatchers, BookingHelperSelectors, TimeslotDispatchers, ReserveSelectors, SystemInfoSelectors } from '../../../../store';
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

  private datesSearchText$: Observable<string>;
  public datesSearchText: string;
  public resourceName = '';

  public dates$: Observable<string[]>;
  private selectedDate$: Observable<string>;
  private reservedAppointment$: Observable<IAppointment>;
  private selectedDate: string;
  private reservedAppointment: IAppointment;
  private dateConvention$: Observable<string>;
  public dateFormat = 'dddd MMMM DD YYYY';

  constructor(
    private dateSelectors: DateSelectors,
    private dateDispatchers: DateDispatchers,
    private timeslotDispatchers: TimeslotDispatchers,
    private bookingHelperSelectors: BookingHelperSelectors,
    private bookingHelperService: BookingHelperService,
    private reserveSelectors: ReserveSelectors,
    private systemInfoSelectors: SystemInfoSelectors
  ) {
    this.dates$ = this.dateSelectors.visibleDates$;
    this.datesSearchText$ = this.dateSelectors.searchText$;
    this.selectedDate$ = this.bookingHelperSelectors.selectedDate$;
    this.reservedAppointment$ = this.reserveSelectors.reservedAppointment$;
    this.dateConvention$ = this.systemInfoSelectors.systemInfoDateConvention$;
  }

  ngOnInit() {
    const searchTextSubscription = this.datesSearchText$.subscribe(
      (searchText: string) => {
        this.datesSearchText = searchText;
      }
    );

    const selectedDateSubscription = this.selectedDate$.subscribe(
      (selectedDate: string) => {
        this.selectedDate = selectedDate;
        this.resetSearchText();
      }
    );

    const reservedAppointmentSubscription = this.reservedAppointment$.subscribe(
      (reservedAppointment: IAppointment) => {
        this.reservedAppointment = reservedAppointment;
        this.setResourceName();
      }
    );
    const dateConventionSubscription = this.dateConvention$.subscribe(
      (dateConvention: string) => {
        this.dateFormat = dateConvention || 'dddd MMMM DD YYYY';
      }
    );
    this.subscriptions.add(dateConventionSubscription);
    this.subscriptions.add(searchTextSubscription);
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
    const bookingInformation: IBookingInformation = this.bookingHelperService.getBookingInformation();
    this.timeslotDispatchers.getTimeslots(bookingInformation);
  }

  resetSearchText() {
    const hasText = this.datesSearchText.length > 0;

    if (hasText === true) {
      this.dateDispatchers.resetDatesFilter();
    }
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

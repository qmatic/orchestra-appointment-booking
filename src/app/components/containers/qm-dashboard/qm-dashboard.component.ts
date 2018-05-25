import {
  ReservationExpiryTimerDispatchers
} from './../../../../store/services/reservation-expiry-timer/reservation-expiry-timer.dispatchers';
import { CalendarSettingsSelectors } from './../../../../store/services/calendar-settings/calendar-settings.selectors';
import { ReservationExpiryTimerSelectors } from './../../../../store/services/reservation-expiry-timer/reservation-expiry-timer.selectors';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ICustomer } from '../../../../models/ICustomer';
import { CustomerSelectors, UserSelectors, BookingHelperSelectors, AppointmentSelectors } from '../../../../store';
import { IService } from '../../../../models/IService';
import { IAppointment } from '../../../../models/IAppointment';

@Component({
  selector: 'qm-dashboard',
  templateUrl: './qm-dashboard.component.html',
  styleUrls: ['./qm-dashboard.component.scss']
})
export class QmDashboardComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private currentCustomer$: Observable<ICustomer>;
  private selectedServices$: Observable<IService[]>;
  private selectedServices: IService[];
  private selectedAppointment$: Observable<IAppointment>;
  public currentCustomer: ICustomer;
  public showExpiryReservationTime$: Observable<Boolean>;
  public userDirection$: Observable<string>;
  public selectedAppointment: IAppointment;

  constructor(
    private customerSelectors: CustomerSelectors,
    private userSelectors: UserSelectors,
    private reservationExpiryTimerSelectors: ReservationExpiryTimerSelectors,
    private calendarSettingsSelectors: CalendarSettingsSelectors,
    private reservationExpiryTimerDispatchers: ReservationExpiryTimerDispatchers,
    private bookingHelperSelectors: BookingHelperSelectors,
    private appointmentSelectors: AppointmentSelectors
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.currentCustomer$ = this.customerSelectors.currentCustomer$;
    this.selectedServices$ = this.bookingHelperSelectors.selectedServices$;
    // Bing wheather to show or not the timer
    this.showExpiryReservationTime$ = this.reservationExpiryTimerSelectors.showReservationExpiryTime$;
    this.selectedAppointment$ = this.appointmentSelectors.selectedAppointment$;
  }

  ngOnInit() {
    const currentCustomerSubscription = this.currentCustomer$.subscribe(
      (customer: ICustomer) => (this.currentCustomer = customer)
    );

    const selectedServicesSubscription = this.selectedServices$.subscribe(
      (selectedServices: IService[]) => this.selectedServices = selectedServices
    );

    const selectedAppointmentSubscription = this.selectedAppointment$.subscribe(
      (selectedAppointment: IAppointment) => {
        this.selectedAppointment = selectedAppointment;
      }
    );

    this.subscriptions.add(currentCustomerSubscription);
    this.subscriptions.add(selectedServicesSubscription);
    this.subscriptions.add(selectedAppointmentSubscription);
  }

  customerAppointmentsAreVisible(): boolean {
    return this.currentCustomer !== null && this.selectedServices.length === 0;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

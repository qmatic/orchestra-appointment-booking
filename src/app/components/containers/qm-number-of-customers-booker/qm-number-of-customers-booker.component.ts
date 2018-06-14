import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { BookingHelperSelectors, NumberOfCustomersSelectors, NumberOfCustomersDispatchers, AppointmentSelectors } from '../../../../store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Setting } from '../../../../models/Setting';
import { IAppointment } from '../../../../models/IAppointment';

@Component({
  selector: 'qm-number-of-customers-booker',
  templateUrl: './qm-number-of-customers-booker.component.html',
  styleUrls: ['./qm-number-of-customers-booker.component.scss'],
})
export class QmNumberOfCustomersBookerComponent implements OnInit, OnDestroy {
  @Input()
  settingsMap: { [name: string]: Setting };

  @Input()
  userDirection: string;

  public numberOfCustomersArray$: Observable<number[]>;

  private subscriptions: Subscription = new Subscription();
  private selectedNumberOfCustomers$: Observable<number>;
  private selectedAppointment$: Observable<IAppointment>;

  private selectedNumberOfCustomers: number;
  private selectedAppointment: IAppointment;

  private firstLoadOnEdit = false;

  constructor(
    private bookingHelperSelectors: BookingHelperSelectors,
    private numberOfCustomersSelectors: NumberOfCustomersSelectors,
    private numberOfCustomersDispatchers: NumberOfCustomersDispatchers,
    private appointmentSelectors: AppointmentSelectors
  ) {
    this.selectedNumberOfCustomers$ = this.bookingHelperSelectors.selectedNumberOfCustomers$;
    this.numberOfCustomersArray$ = this.numberOfCustomersSelectors.numberOfCustomersArray$;
    this.selectedAppointment$ = this.appointmentSelectors.selectedAppointment$;
  }

  ngOnInit() {
    const selectedNumberOfCustomersSubscription = this.selectedNumberOfCustomers$.subscribe(
      (selectedNumberOfCustomers: number) => {
        this.selectedNumberOfCustomers = selectedNumberOfCustomers;
    });

    const selectedAppointmentSubscription = this.selectedAppointment$.subscribe(
      (selectedAppointment: IAppointment) => {
        if (selectedAppointment !== null) {
          this.firstLoadOnEdit = true;
        } else {
          this.firstLoadOnEdit = false;
        }
        this.selectedAppointment = selectedAppointment;
      }
    );

    const numberOfCustomersArraySubscription = this.numberOfCustomersArray$.subscribe(
      (numberOfCustomersArray: number[]) => {
        if (this.firstLoadOnEdit === true) {
          if (this.selectedAppointment
            && this.selectedAppointment['numberOfCustomers'] !== undefined
            && this.selectedAppointment.numberOfCustomers !== null) {
            this.numberOfCustomersDispatchers.loadNumberOfCustomers(this.selectedAppointment.numberOfCustomers);
          } else {
            this.numberOfCustomersDispatchers.loadNumberOfCustomers(1);
          }
          this.firstLoadOnEdit = false;
        } else {
          this.numberOfCustomersDispatchers.setNumberOfCustomers(1);
        }
    });

    this.subscriptions.add(selectedNumberOfCustomersSubscription);
    this.subscriptions.add(selectedAppointmentSubscription);
    this.subscriptions.add(numberOfCustomersArraySubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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
    return this.selectedNumberOfCustomers === numberOfCustomers;
  }
}

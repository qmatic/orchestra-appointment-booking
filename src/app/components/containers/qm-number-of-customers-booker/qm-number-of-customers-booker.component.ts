import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { BookingHelperSelectors, NumberOfCustomersSelectors, NumberOfCustomersDispatchers } from '../../../../store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Setting } from '../../../../models/Setting';

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

  private selectedNumberOfCustomers: number;

  constructor(
    private bookingHelperSelectors: BookingHelperSelectors,
    private numberOfCustomersSelectors: NumberOfCustomersSelectors,
    private numberOfCustomersDispatchers: NumberOfCustomersDispatchers
  ) {
    this.selectedNumberOfCustomers$ = this.bookingHelperSelectors.selectedNumberOfCustomers$;
    this.numberOfCustomersArray$ = this.numberOfCustomersSelectors.numberOfCustomersArray$;
  }

  ngOnInit() {
    const selectedNumberOfCustomersSubscription = this.selectedNumberOfCustomers$.subscribe(
      (selectedNumberOfCustomers: number) => {
        this.selectedNumberOfCustomers = selectedNumberOfCustomers;
      });

    const numberOfCustomersArraySubscription = this.numberOfCustomersArray$.subscribe(
      (numberOfCustomersArray: number[]) => {
        this.numberOfCustomersDispatchers.setNumberOfCustomers(1);
      });

    this.subscriptions.add(selectedNumberOfCustomersSubscription);
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

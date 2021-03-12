import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { ICustomer } from "../../../../models/ICustomer";
import { CustomerSelectors, UserSelectors } from "../../../../store";

@Component({
  selector: "qm-qm-appointment-history",
  templateUrl: "./qm-appointment-history.component.html",
  styleUrls: ["./qm-appointment-history.component.scss"],
})
export class QmAppointmentHistoryComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  public currentCustomer: ICustomer;
  private currentCustomer$: Observable<ICustomer>;
  userDirection$: Observable<string>;

  constructor(
    private userSelectors: UserSelectors,
    private customerSelectors: CustomerSelectors
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.currentCustomer$ = this.customerSelectors.currentCustomer$;
    // this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
  }

  ngOnInit() {
    const currentCustomerSubscription = this.currentCustomer$.subscribe(
      (customer: ICustomer) => (this.currentCustomer = customer)
    );
    this.subscriptions.add(currentCustomerSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  
}

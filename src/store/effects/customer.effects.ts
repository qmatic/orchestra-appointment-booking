import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { switchMap, tap } from 'rxjs/operators';

import * as CustomerActions from './../actions';
import { CustomerDataService } from '../services';
import { ToastService } from '../../services/util/toast.service';

const toAction = CustomerActions.toAction();

@Injectable()
export class CustomerEffects {
    constructor(
      private actions$: Actions,
      private customerDataService: CustomerDataService,
      private toastService: ToastService,
      private translateService: TranslateService
    ) {}

    @Effect()
    getCustomers$: Observable<Action> = this.actions$
      .ofType(CustomerActions.FETCH_CUSTOMERS)
      .pipe(
        switchMap((action: CustomerActions.FetchCustomers) => {
            return toAction(
              this.customerDataService.getCustomers(action.payload),
              CustomerActions.FetchCustomersSuccess,
              CustomerActions.FetchCustomersFail
            );
          }
        )
      );

    @Effect()
    createCustomer$: Observable<Action> = this.actions$
      .ofType(CustomerActions.CREATE_CUSTOMER)
      .pipe(
        switchMap((action: CustomerActions.CreateCustomer) => {
            return toAction(
              this.customerDataService.createCustomer(action.payload),
              CustomerActions.CreateCustomerSuccess,
              CustomerActions.CreateCustomerFail
            );
          }
        )
      );

    @Effect()
    selectCustomerAfterCreation$: Observable<Action> = this.actions$
      .ofType(CustomerActions.CREATE_CUSTOMER_SUCCESS)
      .pipe(
        tap((action: CustomerActions.CreateCustomerSuccess) =>
          this.translateService.get('label.customer.created').subscribe(
            (label: string) => this.toastService.successToast(label + ' ' + action.payload.name)
          ).unsubscribe()
        ),
        switchMap((action: CustomerActions.CreateCustomerSuccess) =>
            [new CustomerActions.SelectCustomer(action.payload)]
        )
      );

    @Effect()
    updateCustomer$: Observable<Action> = this.actions$
      .ofType(CustomerActions.UPDATE_CUSTOMER)
      .pipe(
        switchMap((action: CustomerActions.UpdateCustomer) => {
            return toAction(
              this.customerDataService.updateCustomer(action.payload),
              CustomerActions.UpdateCustomerSuccess,
              CustomerActions.UpdateCustomerFail
            );
          }
        )
      );

    @Effect()
    selectCustomerAfterUpdate$: Observable<Action> = this.actions$
      .ofType(CustomerActions.UPDATE_CUSTOMER_SUCCESS)
      .pipe(
        tap((action: CustomerActions.UpdateCustomerSuccess) =>
          this.toastService.successToast('Successfully updated customer ' + action.payload.name)
        ),
        switchMap((action: CustomerActions.UpdateCustomerSuccess) =>
            [new CustomerActions.SelectCustomer(action.payload)]
        )
      );

}

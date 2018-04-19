import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions } from '@ngrx/effects';
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
      private toastService: ToastService
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
          this.toastService.successToast('Successfully created customer ' + action.payload.name)
        ),
        switchMap((action: CustomerActions.CreateCustomerSuccess) =>
            [new CustomerActions.SelectCustomer(action.payload)]
        )
      );
}

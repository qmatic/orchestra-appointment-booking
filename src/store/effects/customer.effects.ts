import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

import * as CustomerActions from './../actions';
import { CustomerDataService } from '../services';

const toAction = CustomerActions.toAction();

@Injectable()
export class CustomerEffects {
    constructor(
      private actions$: Actions,
      private customerDataService: CustomerDataService
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
}

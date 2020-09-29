import { GlobalErrorHandler } from './../../services/util/global-error-handler.service';
import { DataServiceError } from './../services/data.service';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
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
    private translateService: TranslateService,
    private globalErrorHandler: GlobalErrorHandler
  ) { }

  @Effect()
  getCustomers$: Observable<Action> = this.actions$
    .pipe(
      ofType(CustomerActions.FETCH_CUSTOMERS),
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
    .pipe(
      ofType(CustomerActions.CREATE_CUSTOMER),
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
    .pipe(
      ofType(CustomerActions.CREATE_CUSTOMER_SUCCESS),
      tap((action: CustomerActions.CreateCustomerSuccess) =>
        this.translateService.get('label.customer.created', { 0: action.payload.name }).subscribe(
          (label: string) => this.toastService.successToast(label)
        ).unsubscribe()
      ),
      switchMap((action: CustomerActions.CreateCustomerSuccess) =>
        [new CustomerActions.SelectCustomer(action.payload)]
      )
    );

  @Effect({ dispatch: false })
  createCustomerFailed$: Observable<Action> = this.actions$
    .pipe(
      ofType(CustomerActions.CREATE_CUSTOMER_FAIL),
      tap((action: CustomerActions.CreateCustomerFail) => {
        this.globalErrorHandler
          .showError('label.customer.created.error', action.payload);
      }
      )
    );



  @Effect()
  updateCustomer$: Observable<Action> = this.actions$
    .pipe(
      ofType(CustomerActions.UPDATE_CUSTOMER),
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
    .pipe(
      ofType(CustomerActions.UPDATE_CUSTOMER_SUCCESS),
      tap((action: CustomerActions.UpdateCustomerSuccess) =>
        this.translateService.get('label.customer.updated').subscribe(
          (label: string) => this.toastService.successToast(`${label} ${action.payload.name}`)
        ).unsubscribe()
      ),
      switchMap((action: CustomerActions.UpdateCustomerSuccess) =>
        [new CustomerActions.SelectCustomer(action.payload)]
      )
    );

  @Effect({ dispatch: false })
  updateCustomerFailed$: Observable<Action> = this.actions$
    .pipe(
      ofType(CustomerActions.UPDATE_CUSTOMER_FAIL),
      tap((action: CustomerActions.UpdateCustomerFail) => {
        this.globalErrorHandler
          .showError('label.customer.updated.error', action.payload);
      }
      )
    );

  @Effect()
  resetCurrentCustomer$: Observable<Action> = this.actions$
    .pipe(
      ofType(CustomerActions.RESET_CURRENT_CUSTOMER),
      switchMap((action: CustomerActions.ResetCurrentCustomer) =>
        [new CustomerActions.ResetAppointments]
      )
    );

  @Effect()
  getCutsomerById$: Observable<Action> = this.actions$
    .pipe(
      ofType(CustomerActions.GET_CUSTOMER_BY_ID),
      switchMap((action: CustomerActions.GetCustomerById) => {
        return toAction(
          this.customerDataService.getCustomerByPublicId(action.payload),
          CustomerActions.GetCustomerByIdSuccess,
          CustomerActions.GetCustomerByIdFail
        );
      }
      )
    );

}

import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

import * as ServiceActions from './../actions';
import { ServiceDataService } from '../services';

const toAction = ServiceActions.toAction();

@Injectable()
export class ServiceEffects {
    constructor(
      private actions$: Actions,
      private serviceDataService: ServiceDataService
    ) {}

    @Effect()
    getServices$: Observable<Action> = this.actions$
      .ofType(ServiceActions.FETCH_SERVICES)
      .pipe(
        switchMap(() =>
          toAction(
            this.serviceDataService.getServices(),
            ServiceActions.FetchServicesSuccess,
            ServiceActions.FetchServicesFail
          )
        )
      );
}

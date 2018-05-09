import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

import * as AllActions from './../actions';
import { ServiceDataService } from '../services';

const toAction = AllActions.toAction();

@Injectable()
export class ServiceEffects {
    constructor(
      private actions$: Actions,
      private serviceDataService: ServiceDataService
    ) {}

    @Effect()
    getServices$: Observable<Action> = this.actions$
      .ofType(AllActions.FETCH_SERVICES)
      .pipe(
        switchMap(() =>
          toAction(
            this.serviceDataService.getServices(),
            AllActions.FetchServicesSuccess,
            AllActions.FetchServicesFail
          )
        )
      );

    @Effect()
    getServiceGroups$: Observable<Action> = this.actions$
      .ofType(AllActions.FETCH_SERVICE_GROUPS)
      .pipe(
        switchMap((action: AllActions.FetchServiceGroups) =>
          toAction(
            this.serviceDataService.getServiceGroups(action.payload),
            AllActions.FetchServiceGroupsSuccess,
            AllActions.FetchServiceGroupsFail
          )
        )
      );

}

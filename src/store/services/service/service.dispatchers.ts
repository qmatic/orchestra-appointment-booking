import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../reducers';
import * as ServiceActions from '../../actions';

@Injectable()
export class ServiceDispatchers {
  constructor(private store: Store<IAppState>) {}

  fetchServices() {
    this.store.dispatch(new ServiceActions.FetchServices);
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../reducers';

import * as SystemInfoActions from '../actions';

@Injectable()
export class SystemInfoDispatchers {
  constructor(private store: Store<IAppState>) {}

  fetchSystemInfo() {
    this.store.dispatch(new SystemInfoActions.FetchSystemInfo);
  }
}

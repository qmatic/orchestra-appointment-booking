import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../reducers';
import * as actions from '../../actions';

@Injectable()
export class LicenseDispatchers {
  constructor(private store: Store<IAppState>) {}

  fetchLicenseInfo() {
    this.store.dispatch(new actions.FetchLicenseInfo());
  }
}

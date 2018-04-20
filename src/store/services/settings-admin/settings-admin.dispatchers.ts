import { IBranch } from './../../../models/IBranch';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../reducers';
import * as SettingsAdminActions from '../../actions';

@Injectable()
export class SettingsAdminDispatchers {
  constructor(private store: Store<IAppState>) {}

  fetchSettings() {
    this.store.dispatch(new SettingsAdminActions.FetchSettings);
  }
}

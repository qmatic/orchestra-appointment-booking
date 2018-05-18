import { SettingsBuilder } from './../../../models/SettingsBuilder';
import { ISettingsUpdateRequest } from './../../../models/ISettingsResponse';
import { IBranch } from './../../../models/IBranch';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../reducers';
import * as ShiroRefreshActions from '../../actions';

@Injectable()
export class ShiroDispatchers {
  constructor(private store: Store<IAppState>) {}

  startRefresh() {
    this.store.dispatch(new ShiroRefreshActions.StartRefresh);
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../reducers';
import * as RoleActions from '../../actions';

@Injectable()
export class UserRoleDispatchers {
  constructor(private store: Store<IAppState>) {}

  fetchUserRoleInfo() {
    this.store.dispatch(new RoleActions.FetchUserRoleInfo());
  }
}

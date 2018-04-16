import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../reducers';

import * as UserActions from '../../actions';

@Injectable()
export class UserDispatchers {
  constructor(private store: Store<IAppState>) {}

  fetchUserInfo() {
    this.store.dispatch(new UserActions.FetchUserInfo);
  }
}

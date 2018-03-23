import { SelectLamda } from './models/types';
import { Store } from '@ngrx/store';
import { IAppState } from './../models/IAppState';
import { Injectable } from '@angular/core';
import { IAction } from './models/IAction';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReduxService {
  constructor(private store: Store<IAppState>) {
  }

  dispatch<T>(action: IAction<T>) {
    this.store.dispatch(action);
  }

  select<T>(lamda: SelectLamda): Store<T> {
    return this.store.select<T>(lamda);
  }
}
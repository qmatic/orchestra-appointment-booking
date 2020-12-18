// General purpose entity action stuff, good for any entity type
import { Observable ,  of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, mergeMap } from 'rxjs/operators';

import { DataServiceError } from '../services';

export abstract class DataAction<T> implements Action {
  readonly type: string;
  constructor(public readonly payload: T) {}
}

export abstract class DataErrorAction<T> implements Action {
  readonly type: string;
  constructor(public readonly payload: DataServiceError<T>) {}
}

// Function of additional success actions
// that returns a function that returns
// an observable of ngrx action(s) from DataService method observable
export const toAction = (...actions: Action[]) => <T>(
  source: Observable<T>,
  successAction: new (data: T) => Action,
  errorAction: new (err: DataServiceError<T>) => Action
) =>
  source.pipe(
    mergeMap((data: T) => [new successAction(data), ...actions]),
    catchError((err: DataServiceError<T>) => of(new errorAction(err)))
  );

export const toActionSecondary = (...actions: Action[]) => <T>(
  source: Observable<T>,
  successAction: new (data: T) => Action,
  errorAction: new (err: DataServiceError<T>) => Action
) =>
  source.pipe(
    mergeMap((data: T) => [...actions, new successAction(data)]),
    catchError((err: DataServiceError<T>) => of(new errorAction(err)))
  );

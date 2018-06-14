import { IPrintState } from './../../reducers/print.reducer';
import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';

// selectors
const getPrintState = createFeatureSelector<IPrintState>('printedAppointment');


export const getPrintedAppointment = createSelector(
  getPrintState,
  (state: IPrintState) => state.printedAppointment
);

@Injectable()
export class PrintSelectors {
  constructor(private store: Store<IAppState>) {}
  // selectors$
  printedAppointment$ = this.store.select(getPrintedAppointment);
}

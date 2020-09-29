import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as AllActions from './../actions';
import { DateDataService } from '../services';

const toAction = AllActions.toAction();

@Injectable()
export class ReservationExpiryTimerEffects {
  constructor(private actions$: Actions) {}
}

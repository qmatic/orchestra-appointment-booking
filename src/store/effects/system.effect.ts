import { Injectable, OnDestroy } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { LoadSystemInformationSuccess, LoadSystemInformationFail, LOAD_SYSTEM_INFORMATION } from '../actions/system.action';
import { AddToast } from '../actions/toasts.action';
import { ISystemInformation } from '../../models/system.model';
import { IToast } from '../../models/toast.model';

import { SystemService } from '../../services/rest/system.service';

@Injectable()
export class SystemEffects {

    constructor(private actions$: Actions, private systemService: SystemService) { }

    @Effect()
    getSystemInformation$ = this.actions$
                .ofType(LOAD_SYSTEM_INFORMATION).pipe(
                    switchMap(() => this.systemService.fetchSystemInformation().pipe(
                        mergeMap((res) => {
                            const toast: IToast = {
                                id: "Need a util fn to create toast",
                                text: "Successfully fetched systemInformation"
                            }
                            
                            return [
                                new LoadSystemInformationSuccess(res),
                                new AddToast(toast)
                            ]
                        }), catchError((err) => of(new LoadSystemInformationFail(err)))
                    ))
                )
                
                
}
import { Injectable, OnDestroy } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap } from 'rxjs/operators';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import 'rxjs/add/operator/map';
import { of } from 'rxjs/observable/of';
import { timer } from 'rxjs/observable/timer';
import { Subscription } from 'rxjs/Subscription';


import { IAppState, getAllToasts } from '../../store/reducers';
import * as toastActions from '../actions/toasts.action';
import { IToast } from '../../models/toast.model';

@Injectable()
export class ToastsEffects implements OnDestroy {
    toasts: IToast[];
    toastSubscription$: Subscription;

    constructor(private actions$: Actions, private store: Store<IAppState>) {
        this.toastSubscription$ = this.store.select(getAllToasts).subscribe((t) => this.toasts = t);
    }

    ngOnDestroy() {
        this.toastSubscription$.unsubscribe();
    }

    @Effect()
    addToast$ = this.actions$
                .ofType(toastActions.ADD_TOAST)
                .map((action: toastActions.AddToast) => action.payload)
                .pipe(mergeMap((toast: IToast) => timer(5000)
                .pipe(
                    mergeMap(() => {
                        if(this.toasts.find(iToast => iToast.id === toast.id)) {
                            return of(new toastActions.RemoveToast(toast));
                        } else {
                            return new EmptyObservable();
                        }
                    }) 
                   )
                  )
                )
}

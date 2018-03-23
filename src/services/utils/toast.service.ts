import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';
import { Subscription } from 'rxjs/Subscription';

import { IToast } from '../../models/toast.model';
import { IAppState, getAllToasts, getNumberOfTotalToasts } from '../../store/reducers';
import { AddToast, RemoveToast, RemoveFirstToast } from '../../store/actions/toasts.action';

@Injectable()
export class ToastsService implements OnDestroy {
  numberOfToasts: number;
  toastNumberSubscription$: Subscription;

  toasts: IToast[];
  toastSubscription$: Subscription;

  constructor(private store: Store<IAppState>) { 
    this.toastNumberSubscription$ = this.store.select(getNumberOfTotalToasts).subscribe((n) => this.numberOfToasts = n);
    this.toastSubscription$ = this.store.select(getAllToasts).subscribe((t) => this.toasts = t);
  }

  ngOnDestroy() {
    this.toastNumberSubscription$.unsubscribe();
    this.toastSubscription$.unsubscribe();
  }

  addToast(text: string) {
    const toast: IToast = {
      id: this.guid(),
      text: text
    }

    if(this.numberOfToasts >= 3) {
      this.store.dispatch(new RemoveFirstToast());
    }
    
    this.store.dispatch(new AddToast(toast))
  }

  removeToast(toast: IToast) {
    const isStillInState = this.toasts.find(iToast => iToast.id === toast.id);
    
    if(isStillInState) { this.store.dispatch(new RemoveToast(toast)) } 
  }
  
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
}


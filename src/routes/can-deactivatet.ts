import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    let focused: any = document.activeElement;
    if (!focused || focused === document.body) {
      focused = null;
    } else if (document.querySelector) {
      focused = document.querySelector(':focus');
    }
    if (focused) {
      focused.blur();
    }
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}

import { Action } from '@ngrx/store/src/models';
import { ShiroRefreshError } from './../actions/shiro.actions';
import { ShiroDataService } from './../services/shiro-refresh/shiro-data.service';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { switchMap, tap, mergeMap } from 'rxjs/operators';
import 'rxjs/add/observable/interval';

import * as ShiroActions from './../actions';
import { AccountDataService } from '../services';

const toAction = ShiroActions.toAction();

@Injectable()
export class ShiroEffects {

    // refresh interval is on miliseconds (5 minutes - 5x60x1000)
    private readonly REFRESH_INTERVAL = 300000;

    constructor(
        private actions$: Actions,
        private shiroDataService: ShiroDataService
    ) { }

    @Effect()
    refresh$: Observable<Action> = this.actions$
        .ofType(ShiroActions.START_REFRESH)
        .pipe(
            switchMap(() => Observable.interval(this.REFRESH_INTERVAL))
        )
        .pipe(
            switchMap(() =>
                    toAction(
                    this.shiroDataService.refreshShiro(),
                    ShiroActions.ShiroRefreshSuccess,
                    ShiroActions.ShiroRefreshError
                )
        ));
}

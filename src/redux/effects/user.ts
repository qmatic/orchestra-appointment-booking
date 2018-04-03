import { IUser } from './../../models/IUser';
import * as userActions from './../actions/user';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import { Action } from '@ngrx/store/src/models';
import { Effect, Actions } from '@ngrx/effects';
import { switchMap, mergeMap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Http } from '@angular/http';
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private http: Http, private translate: TranslateService) {
    }

    @Effect()
    getUsers$ = this.actions$
        .ofType(userActions.FETCH_USER_INFO)
        .switchMap((action) => this.http.get('rest/servicepoint/user'))
        .mergeMap(user => {
            // Set user language
            this.translate.use('staffBookingMessages' + (user.json().locale == "en" ? "" : user.json().locale));
            return [{type: userActions.FETCH_USER_SUCCESS, payload: user.json()}]
        })
        .catch(err => [{ type: userActions.FETCH_USER_FAIL, payload: err }]);
}
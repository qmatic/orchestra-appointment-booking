import { IAppState } from './../models/IAppState';
import { FILTER_BRANCH_LIST } from './../store/actions/branch-list.actions';
import { IUser } from './../models/IUser';
import { Store } from '@ngrx/store';
import { IBranch } from './../models/IBranch';
import { Component } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fullName$: Observable<string>;
  branchState: Observable<IBranch[]>;
  langDir$: Observable<string>;
  branches = ['Colombo', 'Galle', 'Kandy'];
  
  constructor(private store: Store<IAppState>) {
    this.langDir$ = this.store.select(state => state.user.data.direction);
    this.branchState = this.store.select(state => state.branchList);
    this.fullName$ = this.store.select<string>(store => store.user.data.fullName);
  }}

// import { Injectable } from '@angular/core';
// import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

// import { IAppState } from '../../reducers';
// import { IAccountState } from '../../reducers/account.reducer';
// import { IAccount } from '../../../models/IAccount';

// // selectors
// const getUserState = createFeatureSelector<IAccountState>('account');

// const getUser = createSelector(
//   getUserState,
//   (state: IAccountState) => state.data
// );

// const getUserFullName = createSelector(
//   getUser,
//   (state: IAccount) => state.fullName
// );

// const getUserUserName = createSelector(
//   getUser,
//   (state: IAccount) => state.userName
// );

// export const getUserLocale = createSelector(
//   getUser,
//   (state: IAccount) => state.locale
// );

// const getUserDirection = createSelector(
//   getUser,
//   (state: IAccount) => state.direction
// );

// const getUserIsAdmin = createSelector(
//   getUserState,
//   (state: IAccountState) => state.isAdmin
// );

// @Injectable()
// export class AccountSelectors {
//   constructor(private store: Store<IAppState>) {}
//   // selectors$
//   user$ = this.store.select(getUser);
//   userFullName$ = this.store.select(getUserFullName);
//   userUserName$ = this.store.select(getUserUserName);
//   userLocale$ = this.store.select(getUserLocale);
//   userDirection$ = this.store.select(getUserDirection);
//   userIsAdmin$ = this.store.select(getUserIsAdmin);
// }

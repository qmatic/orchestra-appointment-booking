import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState } from '../../reducers';
import { ICustomerState } from '../../reducers/customer.reducer';
import { ILanguageState } from '../../reducers/language.reducer';

// selectors
const getLanguageState = createFeatureSelector<ILanguageState>('language');

const getLanguages = createSelector(
  getLanguageState,
    (state: ILanguageState) => state.languages
  );
  const getSelectedLanguage = createSelector(
    getLanguageState,
    (state: ILanguageState) => state.selectedLanguage
  );

  @Injectable()
  export class LanguageSelectors {
    constructor(private store: Store<IAppState>) {}
    languages$ = this.store.select(getLanguages);
    selectedLanguage$ = this.store.select(getSelectedLanguage);
  }
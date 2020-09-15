import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../reducers';
import * as LanguageActions from '../../actions';

@Injectable()
export class LanguageDispatchers {
  constructor(private store: Store<IAppState>) {}

  fetchLanguages() {
    this.store.dispatch(new LanguageActions.FetchLanguages);
  }
  updateLanguage(language: string, branchId: string, visitId: string) {
    let payload = {language, branchId , visitId};
    this.store.dispatch(new LanguageActions.UpdateLanguage(payload));
  }
  setLanguage(language: string) {
    this.store.dispatch(new LanguageActions.setLanguage(language));
  }
  
}
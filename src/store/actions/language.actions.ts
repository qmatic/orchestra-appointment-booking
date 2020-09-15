import { Action } from '@ngrx/store';
import { ICustomer } from '../../models/ICustomer';
import { ILanguage } from '../../models/ILanguage';

export const FETCH_LANGUAGES = '[Language] FETCH_LANGUAGES';
export const FETCH_LANGUAGES_FAIL = '[Language] FETCH_LANGUAGES_FAIL';
export const FETCH_LANGUAGES_SUCCESS = '[Customer] FETCH_LANGUAGES_SUCCESS';
export const UPDATE_LANGUAGE = '[Language] UPDATE_LANGUAGE';
export const UPDATE_LANGUAGE_FAIL = '[Language] UPDATE_LANGUAGE_FAIL';
export const UPDATE_LANGUAGE_SUCCESS = '[Language] UPDATE_LANGUAGE_SUCCESS';
export const SET_LANGUAGE = '[Language] SET_LANGUAGE';
export const SET_LANGUAGE_FAIL = '[Language] SET_LANGUAGE_FAIL';
export const SET_LANGUAGE_SUCCESS = '[Language] SET_LANGUAGE_SUCCESS';

export class FetchLanguages implements Action {
    readonly type = FETCH_LANGUAGES;
}
export class FetchLanguagesFail implements Action {
    readonly type = FETCH_LANGUAGES_FAIL;
    constructor(public payload: Object) { }
}
export class FetchLanguagesSuccess implements Action {
    readonly type = FETCH_LANGUAGES_SUCCESS;
    constructor(public payload: ILanguage[]) { }
}

export class UpdateLanguage implements Action {
    readonly type = UPDATE_LANGUAGE;
    constructor(public payload: { language: string, branchId: string, visitId: string }) { }
}

export class UpdateLanguageFail implements Action {
    readonly type = UPDATE_LANGUAGE_FAIL;
    constructor(public payload: Object) { }
}

export class UpdateLanguageSuccess implements Action {
    readonly type = UPDATE_LANGUAGE_SUCCESS;
    // constructor(public payload: ICustomer) {}
}
export class setLanguage implements Action {
    readonly type = SET_LANGUAGE;
    constructor(public payload: string) { }
}

// Action types
export type AllLanguageActions = FetchLanguages |
    FetchLanguagesFail |
    FetchLanguagesSuccess |
    UpdateLanguage |
    UpdateLanguageFail |
    UpdateLanguageSuccess | 
    setLanguage;
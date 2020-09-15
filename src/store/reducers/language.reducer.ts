import * as LanguageActions from '../actions';
import { ILanguage } from '../../models/ILanguage';


export interface ILanguageState {
    loading: boolean;
    loaded: boolean;
    error: Object;
    languages: ILanguage[];
    selectedLanguage: string;
}

export const initialState: ILanguageState = {
    loaded: false,
    loading: false,
    error: null,
    languages: null,
    selectedLanguage: ''
};

export function reducer(
    state: ILanguageState = initialState,
    action: LanguageActions.AllLanguageActions
): ILanguageState {
    switch (action.type) {
        case LanguageActions.FETCH_LANGUAGES: {
            return {
                ...state,
                loading: true,
                loaded: false,
                error: null
            };
        }
        case LanguageActions.FETCH_LANGUAGES_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload
            };
        }
        case LanguageActions.FETCH_LANGUAGES_SUCCESS: {
            return {
                ...state,
                languages: action.payload,
                loading: false,
                loaded: false,
                error: null
            };
        }
        case LanguageActions.SET_LANGUAGE: {
            return {
                ...state,
                selectedLanguage: action.payload,
                loading: false,
                loaded: false,
                error: null
            };
        }
        default: {
            return state;
          }
    }
}
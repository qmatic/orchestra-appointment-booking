import * as SettingsAdminActions from '../actions';
import { Setting, SettingCategoryEnum } from '../../models/Setting';
import { SettingsBuilder } from '../../models/SettingsBuilder';
import { ILanguageSetting } from '../../models/ILanguageSettings';

export interface ISettingsAdminState {
  settings: Setting[];
  languages: ILanguageSetting[];
  settingsByCategory: SettingCategoryEnum[];
  loading: boolean;
  loaded: boolean;
  error: Object;
}

export const initialState: ISettingsAdminState = {
  settings: new SettingsBuilder().buildDefaultSettings().toArray(),
  languages: [],
  settingsByCategory: [],
  loading: false,
  loaded: false,
  error: null
};

export function reducer (
  state: ISettingsAdminState = initialState,
  action: SettingsAdminActions.AllSettingsActions
): ISettingsAdminState {
  switch (action.type) {
    case SettingsAdminActions.FETCH_SETTINGS: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case SettingsAdminActions.FETCH_SETTINGS_SUCCESS: {
      return {
        ...state,
        settings: action.payload.settings,
        languages: action.payload.languages || [],
        loading: false,
        loaded: true,
        error: null
      };
    }

    case SettingsAdminActions.UPDATE_SETTINGS_STORE: {
      return {
        ...state,
        settings: action.payload,
        loading: false,
        loaded: true,
        error: null
      };
    }

    case SettingsAdminActions.FETCH_SETTINGS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.payload
      };
    }
    default: {
        return state;
    }
  }
}

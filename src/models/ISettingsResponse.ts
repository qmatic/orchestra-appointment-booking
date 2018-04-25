import { Setting, SettingCategoryEnum } from './Setting';

export interface ISettingsResponse {
    settingsList: Setting[];
}

export interface ISettingsUpdateRequest {
    settingsList: Setting[];
}

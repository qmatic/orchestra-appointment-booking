import { Setting, SettingCategoryEnum, SettingOutputType, SettingCategory } from './Setting';
declare var require: any;
const settingsConfig = require('./settings.json');

export class SettingsBuilder {

    private _defaultSettings: Map<string, Setting> = new Map<string, Setting>();
    constructor() {
    }

    buildDefaultSettings(): SettingsBuilder {
        if (settingsConfig && settingsConfig.length > 0) {
            settingsConfig.forEach(cat => {
                cat.settings.forEach((setting: Setting) => {
                    setting.category = new SettingCategory(cat.name, cat.displayText);
                    this._defaultSettings.set(setting.name, setting);
                });
            });
        }

        return this;
    }

    patchSettingsArray(settingsJson: string): SettingsBuilder {
        if (settingsJson && settingsJson.length > 0) {
            const settings  = JSON.parse(settingsJson);
            settings.forEach(s => {
                const targetSetting = this._defaultSettings.get(s.name);
                if (targetSetting) {
                    targetSetting.value = s.value;
                    this._defaultSettings.set(s.name, targetSetting);
                } else {
                    this._defaultSettings.forEach((ds: Setting) => {
                        if (ds.children && ds.children.has(s.name) ) {
                            const childSetting = ds.children.get(s.name);
                            childSetting.value = s.value;
                            ds.children.set(s.name, childSetting);
                        }
                    });
                }
            });
        }

        return this;
    }

    get(): Map<string, Setting> {
        return this._defaultSettings;
    }

    toSettingsArray(): Setting[] {
        return Array.from(this._defaultSettings.values());
    }
}

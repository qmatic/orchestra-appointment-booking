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
            const parsedSettings  = JSON.parse(settingsJson);

            for (const [name, value] of Object.entries(parsedSettings)) {
                const targetSetting = this._defaultSettings.get(name);
                if (targetSetting) {
                    targetSetting.value = value;
                    this._defaultSettings.set(name, targetSetting);
                } else {
                    this._defaultSettings.forEach((ds: Setting) => {
                        if (ds.children && ds.children.has(name) ) {
                            const childSetting = ds.children.get(name);
                            childSetting.value = value;
                            ds.children.set(name, childSetting);
                        }
                    });
                }
              }
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

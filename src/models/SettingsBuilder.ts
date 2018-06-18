import { Setting, SettingCategoryEnum, SettingOutputType, SettingCategory } from './Setting';
declare var require: any;
const settingsConfig = require('./settings.json');

export class SettingsBuilder {

    private _defaultSettings: Map<string, Setting> = new Map<string, Setting>();
    private readonly NULL = '-1'; // temp fix to work with orchestra restriction
    constructor() {
    }

    buildDefaultSettings(): SettingsBuilder {
        if (settingsConfig && settingsConfig.length > 0) {
            settingsConfig.forEach(cat => {
                cat.settings.forEach((setting: any) => {
                    setting.category = new SettingCategory(cat.name, cat.displayText);
                    if (setting.children) {
                        const childArray = setting.children;
                        setting.children = new Map<string, Setting>();

                        childArray.forEach(element => {
                            setting.children.set(element.name, element);
                        });
                    }
                    this._defaultSettings.set(setting.name, setting);
                });
            });
        }

        return this;
    }

    mergeSettingsWithGet(settings: any): SettingsBuilder {

        if (!Array.isArray(settings)) {
            const projected = [];
              Object.keys(settings).map((key, index) => {
                projected.push( {
                    key : key ,
                    value: settings[key]
                });
            });

            settings = projected;
        }

        if (settings && settings.length > 0) {

            for (const st of settings) {
                const key = st.key;
                const value = st.value === this.NULL ? null : st.value; // orchestra server do not allow null
                const targetSetting = this._defaultSettings.get(key);
                if (targetSetting) {
                    targetSetting.value = value;
                    this._defaultSettings.set(key, targetSetting);
                } else {
                    this._defaultSettings.forEach((ds: Setting) => {
                        if (ds.children && ds.children.has(key) ) {
                            const childSetting = ds.children.get(key);
                            childSetting.value = value;
                            ds.children.set(key, childSetting);
                        }
                    });
                }
              }
        }

        return this;
    }

    mergeSettingsForUpdate(parsedSettings: any): SettingsBuilder {
        if (parsedSettings) {
            for (let [name, value] of Object.entries(parsedSettings)) {
                value = value === null ? this.NULL : value;
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

    toArray(): Setting[] {
        return Array.from(this._defaultSettings.values());
    }

    toObject(): Object {
        const settings = Array.from(this._defaultSettings.values())
        .reduce(
            (allSettings: { [name: string]: any }, setting: Setting) => {
              const childSettings = {};

              if (setting.children && setting.children.size > 0) {
                setting.children.forEach((v, k) => {
                  childSettings[k] = v.value;
                });
              }

              return {
                ...allSettings,
                [setting.name]: setting.value,
                ...childSettings
              };
            },
            {}
          );

          return settings;
    }
}

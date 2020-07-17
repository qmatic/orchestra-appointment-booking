import { ILanguageSetting } from "./ILanguageSettings";
import { Setting } from "./Setting";

export interface SettingsWithLanguages {
    settings: Setting[];
    languages: ILanguageSetting[];
}
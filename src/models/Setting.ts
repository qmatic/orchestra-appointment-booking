

export class Setting {
    name: string;
    value: any;
    outputType: SettingOutputType;
    children: Map<string, Setting>;
    category: SettingCategory;
    tooltip: string;
    validators: any;
    constructor(settingName: string , value: any, category: SettingCategory, outputType: SettingOutputType, validators: any = {}) {
        this.name  = settingName;
        this.value  = value;
        this.category = category;
        this.outputType = outputType;
        this.validators = validators;
    }
    toString(): string {
        return this.name;
    }
}

export const enum SettingOutputType {
    Boolean = 'Boolean',
    Text = 'Text',
    TimeFormat = 'TimeFormat',
    List = 'List',
}

export const enum SettingCategoryEnum {
    General = 'General',
    NotificationOptions = 'Notification Options',
    TitleAndNotes = 'Title and Notes',
    CustomerInputFields = 'Customer Input Fields',
    AppointmentList = 'Appointment List'
}


export class SettingCategory {
    name: string;
    settings: Map<string, Setting> = new Map<string, Setting>();
    displayText: string;

    constructor(name: string, displayText: string) {
        this.name = name;
        this.displayText = displayText;
    }
}

import { Setting } from './../../../../../models/Setting';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, ViewEncapsulation, EventEmitter, Output } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[qm-settings-checkbox]',
  templateUrl: './settings-checkbox.component.html',
  styleUrls: ['./settings-checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsCheckboxComponent implements OnInit {

  @Input()
  settingLabel: string;

  @Input()
  settingName: string;

  @Input()
  settingValue: boolean;

  @Input()
  settingControl: FormControl;

  @Input()
  settingGroup: FormGroup;

  @Input()
  setting: Setting;

  @Output()
  settingSelect: EventEmitter<Setting> = new EventEmitter() ;

  constructor() { }

  ngOnInit() {
  }

  handleSelect() {
    this.settingSelect.emit(this.setting);
  }
}

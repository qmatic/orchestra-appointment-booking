import { Setting } from './../../../../../models/Setting';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'qm-settings-listbox',
  templateUrl: './settings-listbox.component.html',
  styleUrls: ['./settings-listbox.component.scss']
})
export class SettingsListboxComponent implements OnInit {


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

  @Input()
  listCollection: {key: string, name: string, isVisible?: boolean }[] = [];

  constructor() {
  }

  ngOnInit() {
  }

}

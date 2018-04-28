import { Setting } from './../../../../../models/Setting';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'qm-settings-timeformat',
  templateUrl: './settings-timeformat.component.html',
  styleUrls: ['./settings-timeformat.component.scss']
})
export class SettingsTimeformatComponent implements OnInit {

  constructor() { }

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

  ngOnInit() {
  }

}

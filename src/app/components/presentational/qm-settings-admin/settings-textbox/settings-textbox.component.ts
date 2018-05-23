import { Setting } from './../../../../../models/Setting';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { AutoClose } from '../../../../../services/util/autoclose.service';

@Component({
  selector: 'qm-settings-textbox',
  templateUrl: './settings-textbox.component.html',
  styleUrls: ['./settings-textbox.component.scss']
})
export class SettingsTextboxComponent implements OnInit {
  constructor(public autoCloseService: AutoClose) {}

  @Input() settingLabel: string;

  @Input() settingName: string;

  @Input() settingValue: boolean;

  @Input() settingControl: FormControl;

  @Input() settingGroup: FormGroup;

  @Input() setting: Setting;

  ngOnInit() {}
}

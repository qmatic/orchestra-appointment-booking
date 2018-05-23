import { Setting } from './../../../../../models/Setting';
import { FormControl, FormGroup } from '@angular/forms';
import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  EventEmitter,
  Output
} from '@angular/core';
import { AutoClose } from '../../../../../services/util/autoclose.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[qm-settings-checkbox]',
  templateUrl: './settings-checkbox.component.html',
  styleUrls: ['./settings-checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsCheckboxComponent implements OnInit {
  @Input() settingControl: FormControl;

  @Input() setting: Setting;

  @Output() settingSelect: EventEmitter<Setting> = new EventEmitter();

  constructor(private autoCloseService: AutoClose) {}

  ngOnInit() {}

  handleSelect() {
    this.settingSelect.emit(this.setting);
  }
}

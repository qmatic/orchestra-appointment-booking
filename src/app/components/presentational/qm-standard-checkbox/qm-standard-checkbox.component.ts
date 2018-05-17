import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'qm-standard-checkbox',
  templateUrl: './qm-standard-checkbox.component.html',
  styleUrls: ['./qm-standard-checkbox.component.scss']
})
export class QmStandardCheckboxComponent implements OnInit {

  @Input()
  isSelected = false;

  @Input()
  inputType: string;

  @Input()
  name: string;

  @Input()
  title = '';

  @Output()
  optionChanged = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  handleChange($event) {
    this.optionChanged.emit($event);
  }

}

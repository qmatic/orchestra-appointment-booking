import { AutoClose } from './../../../../services/util/autoclose.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'qm-action-button',
  templateUrl: './qm-action-button.component.html',
  styleUrls: ['./qm-action-button.component.scss']
})
export class QmActionButtonComponent implements OnInit {
  @Input() btnClassName = '';
  @Input() iconClassName = '';
  @Input() text = '';
  @Input() type = '';
  @Input() onlyIcon = false;
  @Input() disabled = false;
  @Output() handleClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(private autoCloseService: AutoClose) {}

  ngOnInit() {}

  onClick(e) {
    this.autoCloseService.refreshAutoClose();
    this.handleClick.emit(e);
  }

  getType(): string {
    return this.hasType() ? this.type : 'button';
  }

  getTextClasses(): string {
    let textClasses = 'qm-action-btn__text';
    if (this.onlyIcon) {
      textClasses += ' sr-only';
    }
    return textClasses;
  }

  getButtonClasses(): string {
    let buttonClasses = 'qm-action-btn';
    if (this.hasButtonClasses()) {
      buttonClasses += ' ' + this.btnClassName;
    }
    if (this.onlyIcon) {
      buttonClasses += ' qm-action-btn--only-icon';
    }
    return buttonClasses;
  }

  getIconClasses(): string {
    let iconClasses = 'qm-action-btn__icon';
    if (this.hasIconClasses()) {
      iconClasses += ' ' + this.iconClassName;
    }
    return iconClasses;
  }

  hasButtonClasses(): boolean {
    return this.btnClassName !== '' ? true : false;
  }

  hasIconClasses(): boolean {
    return this.iconClassName !== '' ? true : false;
  }

  hasType(): boolean {
    return this.type !== '' ? true : false;
  }
}

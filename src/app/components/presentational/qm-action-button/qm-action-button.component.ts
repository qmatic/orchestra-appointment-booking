import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

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
  @Input() disabled = false;
  @Output() handleClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  onClick(e) {
    this.handleClick.emit(e);
  }

  getType(): string {
    return this.hasType() ? this.type : 'button';
  }

  getButtonClasses(): string {
    let buttonClasses = 'qm-action-btn';
    if ( this.hasButtonClasses() ) {
      buttonClasses += ' ' + this.btnClassName;
    }
    return buttonClasses;
  }

  getIconClasses(): string {
    let iconClasses = 'qm-action-btn__icon';
    if ( this.hasIconClasses() ) {
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

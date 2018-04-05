import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'qm-button',
  templateUrl: './qm-button.component.html',
  styleUrls: ['./qm-button.component.scss']
})
export class QmButtonComponent implements OnInit {
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
    let buttonClasses = 'qm-btn';
    if ( this.hasButtonClasses() ) {
      buttonClasses += ' ' + this.btnClassName;
    }
    if ( this.hasIconClasses() ) {
      buttonClasses += ' qm-btn--with-icon';
    }

    return buttonClasses;
  }

  getIconClasses(): string {
    let iconClasses = 'qm-btn__icon';
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

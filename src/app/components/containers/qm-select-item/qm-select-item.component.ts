import { EventEmitter } from 'events';
import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, Output } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'qm-select-item',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'qm-select-item',
    '(focus)': 'handleFocus()',
    '(blur)': 'handleBlur()'
  },
  templateUrl: './qm-select-item.component.html',
  styleUrls: ['./qm-select-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QmListSelectItemComponent implements OnInit {


  @Output()
  change = new EventEmitter();

  constructor(private _element: ElementRef) { }

  ngOnInit() {
  }

  handleFocus() {
    this._element.nativeElement.classList.add('qm-select-item-focus');
  }

  handleBlur() {
    this._element.nativeElement.classList.remove('qm-select-item-focus');
  }

  handleChange($event) {
    this.change.emit($event);
  }
}

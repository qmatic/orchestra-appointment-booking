import { EventEmitter } from '@angular/core';
import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, Output } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'qm-search-box',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'qm-search-box',
    '(focus)': 'handleFocus()',
    '(blur)': 'handleBlur()'
  },
  templateUrl: './qm-search-box.component.html',
  styleUrls: ['./qm-search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QmSearchBoxComponent implements OnInit {


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

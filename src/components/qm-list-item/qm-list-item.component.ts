import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ElementRef } from '@angular/core';

@Component({
  selector: 'qm-list-item',
  host: {
    'class': 'qm-list-item',
    '(focus)': 'handleFocus()',
    '(blur)': 'handleBlur()'
  },
  templateUrl: './qm-list-item.component.html',
  styleUrls: ['./qm-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QmListItemComponent implements OnInit {

  constructor(private _element: ElementRef) { }

  ngOnInit() {
  }

  handleFocus() {
    this._element.nativeElement.classList.add('qm-list-item-focus');
  }

  handleBlur() {
    this._element.nativeElement.classList.remove('qm-list-item-focus');
  }
}

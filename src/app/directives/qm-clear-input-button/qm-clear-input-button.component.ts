import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'qm-clear-input-button',
  templateUrl: './qm-clear-input-button.component.html',
  styleUrls: ['./qm-clear-input-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QmClearInputButtonComponent implements OnInit {

  @Input()
  isVisible: Boolean = false; // whether clear button is visible

  @Input()
  isSearchInput: Boolean = false;

  @Output() clear: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  buttonClicked($event) {
    this.clear.emit();
    $event.preventDefault();
    $event.stopPropagation();
  }
}

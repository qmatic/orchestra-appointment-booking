import { FormControl } from '@angular/forms';
import { tap, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { EventEmitter, Input } from '@angular/core';
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

  inputChanged: Subject<string> = new Subject<string>();

  @Output()
  change = new EventEmitter();

  @Input()
  placeholder: string;

  @Input()
  label: string;

  @Input()
  debounceTime: number;

  @Input()
  searchInputControl: FormControl;

  constructor(private _element: ElementRef) {
      this.inputChanged
            .pipe(
              distinctUntilChanged(),
              debounceTime(this.debounceTime || 0)
            )
            .subscribe(text => this.change.emit(text));
  }

  ngOnInit() {
  }

  handleFocus() {
    this._element.nativeElement.classList.add('qm-search-box-focus');
  }

  handleBlur() {
    this._element.nativeElement.classList.remove('qm-search-box-focus');
  }

  handleInput($event) {
    this.inputChanged.next($event.target.value);
  }
}

import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'qm-standard-radio',
  templateUrl: './qm-standard-radio.component.html',
  styleUrls: ['./qm-standard-radio.component.scss'],
})
export class QmStandardRadioComponent implements OnInit, OnDestroy {
  @Input()
  text: string;

  @Input()
  name: string;

  @Input()
  value: string;

  @Input()
  isSelected = false;

  @Output()
  optionClickeda = new EventEmitter();

  private subscriptions: Subscription = new Subscription();
  private radioInput$: Subject<string> = new Subject<string>();

  constructor() { }

  ngOnInit() {
    const radioInputSubscription = this.radioInput$.subscribe(
      (value: string) => this.optionClickeda.emit(value)
    );

    this.subscriptions.add(radioInputSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  handleClick(value: string) {
    this.radioInput$.next(value);
  }
}

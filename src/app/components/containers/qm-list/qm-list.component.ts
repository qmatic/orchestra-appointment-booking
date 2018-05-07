import {
  Component,
  OnInit,
  Input,
  Output,
  OnDestroy
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'qm-list',
  templateUrl: './qm-list.component.html',
  styleUrls: ['./qm-list.component.scss']
})
export class QmListComponent implements OnInit, OnDestroy {
  @Input()
  searchable = true;

  @Input()
  header: string;

  @Input()
  placeholder: string;

  @Input()
  subheader: string;

  @Input()
  searchText: string;

  @Input()
  displayAsRequired = true;

  @Output()
  search: EventEmitter<string> = new EventEmitter<string>();

  private subscriptions: Subscription = new Subscription();
  private searchInputControl = new FormControl();
  constructor() {}

  ngOnInit() {
    const searchInputSubscription =
      this.searchInputControl.valueChanges.subscribe(
        (text: string) => {
          this.search.emit(text);
        }
      );

    this.subscriptions.add(searchInputSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

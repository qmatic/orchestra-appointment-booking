import { Component, OnInit, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { BranchDispatchers } from '../../../../store';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'qm-list',
  templateUrl: './qm-list.component.html',
  styleUrls: ['./qm-list.component.scss']
})
export class QmListComponent implements OnInit {

  constructor(
    private branchDispatchers: BranchDispatchers
  ) {}

  @Input()
  header: string;

  @Input()
  placeholder: string;

  @Input()
  subheader: string;

  @Output()
  search: EventEmitter<string> = new EventEmitter<string>();

  searchText = '';
  searchInputControl = new FormControl();
  description = 'This is the description';

  ngOnInit() {
    this.searchInputControl.valueChanges
      .debounceTime(500)
      .subscribe((text: string) => {
        this.search.emit(text);
      });
  }
}

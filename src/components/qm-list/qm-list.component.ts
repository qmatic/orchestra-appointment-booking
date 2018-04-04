import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import { BranchDispatchers } from '../../store';

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
  searchText = '';
  searchInputControl = new FormControl();

  ngOnInit() {
    this.searchInputControl.valueChanges
      .debounceTime(500)
      .subscribe((text: string) => {
        this.branchDispatchers.filter(text);
      });
  }
}

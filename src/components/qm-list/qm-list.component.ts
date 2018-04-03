import { IAppState } from './../../models/IAppState';
import { FILTER_BRANCH_LIST } from './../../store/actions/branch-list.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'qm-list',
  templateUrl: './qm-list.component.html',
  styleUrls: ['./qm-list.component.scss']
})
export class QmListComponent implements OnInit {

  constructor(private store: Store<IAppState>) { }

  @Input()
  header: string;
  searchText: string = '';

  searchInputControl = new FormControl();

  ngOnInit() {
    this.searchInputControl.valueChanges
      .debounceTime(500)
      .subscribe((txt)=> {
        this.store.dispatch({
          type: FILTER_BRANCH_LIST,
          payload: txt
        });
      });
  }
}

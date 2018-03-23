import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { IAppState } from '../store/reducers';
import { LoadSystemInformation } from '../store/actions/system.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadSystemInformation());
  }
}

import { IAppState } from './../models/IAppState';
import { IUser } from './../models/IUser';
import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fullName$: Observable<string>;

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.fullName$ = this.store.select<string>(store => store.user.fullName)
  }

  branches = ['Colombo', 'Galle', 'Kandy'];
}

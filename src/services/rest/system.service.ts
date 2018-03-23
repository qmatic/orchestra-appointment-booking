import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { IAppState } from '../../store/reducers';
import { LoadSystemInformation } from '../../store/actions/system.action';
import { ISystemInformation } from '../../models/system.model';


@Injectable()
export class SystemService {

  constructor(private http: HttpClient, private store: Store<IAppState>) {
    
  }

  ngOnInit() {
    this.store.dispatch(new LoadSystemInformation());
  }

  fetchSystemInformation(): Observable<ISystemInformation> {
    return this.http.get<ISystemInformation>(`/calendar-backend/api/v1/settings/systemInformation`)
  }
}

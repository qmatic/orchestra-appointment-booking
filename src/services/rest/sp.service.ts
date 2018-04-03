import { IAppState } from './../../models/IAppState';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IPromise } from 'q';
import { Store } from '@ngrx/store';


@Injectable()
export class SPService {

  private readonly spEndPoint: string = '/rest/servicepoint/';

  constructor(private http: HttpClient, private store: Store<IAppState>) { }

 /*  getAllUsers(): Promise<IUser[]> {
    return this.http.get(this.userList)
      .toPromise().then(res => {
        console.log(res.json());
        this.store.dispatch({
          type: 'ADD_USERS',
          payload: res.json() as IUser[]
        });

        return res.json() as IUser[];
      });
  }
 */

    fetchUserInfo() {
        return this.http.get(this.spEndPoint + '/user')
    }

}

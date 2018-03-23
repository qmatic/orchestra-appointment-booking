import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { IAppState } from '../../store/reducers';


@Injectable()
export class SPService {

  private readonly userList: string = 'https://jsonplaceholder.typicode.com/users';

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

}

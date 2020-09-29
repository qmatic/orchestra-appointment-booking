import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subscription ,  Observable, throwError } from 'rxjs';
import { switchMap, mergeMap, catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { UserSelectors, DataServiceError } from '../../store';


@Injectable()
export class SPService implements OnDestroy {
  userSubscription: Subscription;
  currentUserName$: Observable<string>;
  userName: string;

  private readonly spEndPoint: string = '/rest/servicepoint/';

  constructor(private http: HttpClient, private userSelectors: UserSelectors) {
    this.currentUserName$ = this.userSelectors.userUserName$;
    this.userSubscription = this.currentUserName$.subscribe(
      userName => (this.userName = userName)
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
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

  fetchUserStatus() {
    return this.http.get(this.spEndPoint + 'user/status');
  }

  fetchUserInfo() {
    return this.http.get(this.spEndPoint + 'user');
  }

  logoutFromOrchestra() {
    return this.http.put(this.spEndPoint + 'logout', {});
  }

  logoutFromServicePoint(branchId, servicePointId, username) {
    return this.http.delete(
      this.spEndPoint +
        'branches/' +
        branchId +
        '/servicePoints/' +
        servicePointId +
        '/users/' +
        username
    );
  }

  logout() {
    return this.http
      .get(this.spEndPoint + 'user/status')
      .pipe(
        switchMap((status: any) => {
          const servicePointId =
            status.servicePointId !== null ? status.servicePointId : 0;
          return this.http.delete(
            this.spEndPoint +
              'branches/' +
              status.branchId +
              '/servicePoints/' +
              servicePointId +
              '/users/' +
              this.userName
          );
        })
      )
      .pipe(switchMap(() => this.http.put(this.spEndPoint + 'logout', {})))
      .pipe(catchError(this.handleError()));
  }

  private handleError<T>(requestData?: T) {
    return (res: HttpErrorResponse) => {
      const error = new DataServiceError(res.error, requestData);
      console.error(error);
      return throwError(error);
    };
  } 
}

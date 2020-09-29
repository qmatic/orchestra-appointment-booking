import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable ,  Subscription } from 'rxjs';
import { UserSelectors } from '../../../../store';

@Component({
  selector: 'qm-error',
  templateUrl: './qm-error.component.html',
  styleUrls: ['./qm-error.component.scss']
})
export class QmErrorComponent implements OnInit, OnDestroy {

  errorTextKey = '';
  private subscriptions: Subscription = new Subscription();
  public userDirection$: Observable<string>;

  constructor(private route: ActivatedRoute, private userSelectors: UserSelectors) {
    this.userDirection$ = this.userSelectors.userDirection$;
   }

  ngOnInit() {
    const errorKeySub = this.route.queryParams.subscribe(qp => {
      this.errorTextKey = qp['error-label-key'];
     });

     this.subscriptions.add(errorKeySub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

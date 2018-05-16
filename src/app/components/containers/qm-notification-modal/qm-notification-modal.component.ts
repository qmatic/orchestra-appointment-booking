import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {
  CustomerSelectors,
  UserSelectors
} from '../../../../store';
import { ICustomer } from '../../../../models/ICustomer';

@Component({
  selector: 'qm-notification-modal',
  templateUrl: './qm-notification-modal.component.html',
  styleUrls: ['./qm-notification-modal.component.scss']
})
export class QmNotificationModalComponent implements OnInit {
  private currentCustomer$: Observable<ICustomer>;
  private userDirection$: Observable<string>;

  onOkClicked = new Subject();
  constructor(
    public activeModal: NgbActiveModal,
    private customerSelectors: CustomerSelectors,
    private userSelectors: UserSelectors
  ) {
    this.currentCustomer$ = this.customerSelectors.currentCustomer$;
    this.userDirection$ = this.userSelectors.userDirection$;
  }

  ngOnInit() {
  }

  okClicked() {
    this.activeModal.close('OK');
  }
}

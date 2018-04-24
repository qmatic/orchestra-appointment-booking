import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  QmCreateCustomerModalComponent
} from '../../app/components/presentational/qm-create-customer-modal/qm-create-customer-modal.component';
import { QmUpdateCustomerModalComponent } from '../../app/components/presentational/qm-update-customer-modal/qm-update-customer-modal.component';

@Injectable()
export class ModalService {

  constructor(private modalService: NgbModal) { }

  openCreateCustomerModal() {
    this.modalService.open(QmCreateCustomerModalComponent, { centered: true });
  }

  openUpdateCustomerModal() {
    this.modalService.open(QmUpdateCustomerModalComponent, { centered: true });
  }
}

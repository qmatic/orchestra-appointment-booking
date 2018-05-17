import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  QmCreateCustomerModalComponent
} from '../../app/components/presentational/qm-create-customer-modal/qm-create-customer-modal.component';
import { QmGenericModalComponent } from '../../app/components/presentational/qm-generic-modal/qm-generic-modal.component';
import { QmNotificationModalComponent } from '../../app/components/containers/qm-notification-modal/qm-notification-modal.component';

@Injectable()
export class ModalService {

  constructor(private modalService: NgbModal) { }

  openCreateCustomerModal() {
    const modal = this.modalService.open(QmCreateCustomerModalComponent, { centered: true });
    modal.componentInstance.isOnUpdate = false;
  }

  openUpdateCustomerModal() {
    const modal = this.modalService.open(QmCreateCustomerModalComponent, { centered: true });
    modal.componentInstance.isOnUpdate = true;
  }

  openNavigateBackConfirmModal() {
    return this.modalService.open(QmGenericModalComponent, { centered: true });
  }

  openNotificationModal(typeToEdit: string) {
    const modal = this.modalService.open(QmNotificationModalComponent, { centered: true });
    modal.componentInstance.typeToEdit = typeToEdit;
    return modal;
  }
}

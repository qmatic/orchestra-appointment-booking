import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { QmModalComponent } from './qm-modal.component';

@Injectable()
export class QmModalService {
  constructor(
    private modalService: NgbModal,
    private translate: TranslateService
  ) {}

  public open(
    title: string,
    message: string,
    btnOkText: string,
    btnCancelText: string
  ): Promise<boolean> {
    const modalRef = this.modalService.open(QmModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }

  public openForTransKeys(
    titleKey: string,
    messageKey: string,
    btnOkTextKey: string,
    btnCancelTextKey: string,
    confirmCallback: (result: boolean) => void,
    errorCallback: (err: Object) => void
  ): Subscription {
    return this.translate
      .get([titleKey, messageKey, btnOkTextKey, btnCancelTextKey])
      .subscribe(translations => {
        this.open(
          translations[titleKey],
          translations[messageKey],
          translations[btnOkTextKey],
          translations[btnCancelTextKey]
        )
          .then(confirmed => {
            confirmCallback(confirmed);
          })
          .catch(err => {
            errorCallback(err);
          });
      });
  }
}

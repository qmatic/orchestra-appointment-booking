import { AutoClose } from './../../../../services/util/autoclose.service';
import { Observable } from 'rxjs/Observable';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'qm-modal',
  templateUrl: './qm-modal.component.html',
  styleUrls: ['./qm-modal.component.scss']
})
export class QmModalComponent implements OnInit {
  title: string;
  message: string;
  btnOkText: string;
  btnCancelText: string;

  constructor(
    private activeModal: NgbActiveModal,
    private autoCloseService: AutoClose
  ) {}

  ngOnInit() {}

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}

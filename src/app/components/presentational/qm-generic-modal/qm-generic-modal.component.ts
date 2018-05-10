import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'qm-qm-generic-modal',
  templateUrl: './qm-generic-modal.component.html',
  styleUrls: ['./qm-generic-modal.component.scss']
})
export class QmGenericModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, public router: Router) { }

  onOkClicked = new Subject();

  ngOnInit() {
  }

  okClicked() {
    this.activeModal.close('OK');
  }
}

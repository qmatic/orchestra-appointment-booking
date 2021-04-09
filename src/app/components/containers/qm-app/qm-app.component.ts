import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import {
  UserSelectors
} from '../../../../store/index';
import { ToastService } from '../../../../services/util/toast.service';

@Component({
  selector: 'qm-qm-app',
  templateUrl: './qm-app.component.html',
  styleUrls: ['./qm-app.component.scss']
})
export class QmAppComponent implements OnInit {
  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;
  userFullName$: Observable<string>;
  userDirection$: Observable<string>;

  constructor(
    private userSelectors: UserSelectors,
    private toastService: ToastService,
    private toastrService: ToastrService
  ) {
    this.userFullName$ = this.userSelectors.userFullName$;
    this.userDirection$ = this.userSelectors.userDirection$;
  }

  ngOnInit() {
    this.toastService.setToastContainer(this.toastContainer);
    document.title = 'Appointment Booking';
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastContainerDirective } from 'ngx-toastr';
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
  @ViewChild(ToastContainerDirective, {static: false}) toastContainer: ToastContainerDirective;
  userFullName$: Observable<string>;
  userDirection$: Observable<string>;

  constructor(
    private userSelectors: UserSelectors,
    private toastService: ToastService,
  ) {
    this.userFullName$ = this.userSelectors.userFullName$;
    this.userDirection$ = this.userSelectors.userDirection$;
  }

  ngOnInit() {
    this.toastService.setToastContainer(this.toastContainer);
  }
}

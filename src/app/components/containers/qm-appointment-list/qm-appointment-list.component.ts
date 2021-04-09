import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { UserSelectors } from '../../../../store';
import { ToastService } from '../../../../services/util/toast.service';

@Component({
  selector: 'qm-appointment-list',
  templateUrl: './qm-appointment-list.component.html',
  styleUrls: ['./qm-appointment-list.component.scss']
})
export class QmAppointmentListComponent implements OnInit, OnDestroy {
  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;
  private subscriptions: Subscription = new Subscription();
  private userDirection$: Observable<string>;
  public userDirection: string;
  constructor(
    private toastService: ToastService,
    private userSelectors: UserSelectors,
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
   }

  ngOnInit(): void {

    const userDirectionSubscription = this.userDirection$.subscribe(
      (userDirection: string) => {
        this.userDirection = userDirection;
      }
    );
    this.subscriptions.add(userDirectionSubscription);

    this.toastService.setToastContainer(this.toastContainer);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}

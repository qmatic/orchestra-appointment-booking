import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppointmentSelectors, UserSelectors } from '../../../../store';
import { IAppointment } from '../../../../models/IAppointment';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'qm-appointment-card',
  templateUrl: './qm-appointment-card.component.html',
  styleUrls: ['./qm-appointment-card.component.scss']
})
export class QmAppointmentCardComponent implements OnInit, OnDestroy {

  private userDirection$: Observable<string>;

  @Input()
  appointment: IAppointment;

  constructor(
    private appointmentSelectors: AppointmentSelectors,
    private userSelectors: UserSelectors
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}

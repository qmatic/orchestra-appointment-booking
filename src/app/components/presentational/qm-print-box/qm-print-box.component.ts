import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AppointmentMetaSelectors } from './../../../../store/services/appointment-meta/appointment-meta.selectors';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AppointmentMetaDispatchers } from '../../../../store/index';

@Component({
  selector: 'qm-print-box',
  templateUrl: './qm-print-box.component.html',
  styleUrls: ['./qm-print-box.component.scss']
})
export class QmPrintBoxComponent implements OnInit, OnDestroy {

  constructor(private appointmentMetaSelectors: AppointmentMetaSelectors,
              private appointMentMetaDispatchers: AppointmentMetaDispatchers) { }
  private subscriptions: Subscription = new Subscription();
  private printCheckBox = false;
  private printAppointmentOption$: Observable<boolean> = this.appointmentMetaSelectors.printAppointmentOption$;

  ngOnInit() {
    const printSubscription = this.printAppointmentOption$.subscribe((x) => this.printCheckBox = x);
    this.subscriptions.add(printSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  handleSelect() {
    this.appointMentMetaDispatchers.setPrintAppointment(this.printCheckBox);
  }
}

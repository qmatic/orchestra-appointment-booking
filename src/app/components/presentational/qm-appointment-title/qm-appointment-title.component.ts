import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import {
  AppointmentMetaSelectors,
  AppointmentMetaDispatchers
} from '../../../../store';

@Component({
  selector: 'qm-appointment-title',
  templateUrl: './qm-appointment-title.component.html',
  styleUrls: ['./qm-appointment-title.component.scss']
})
export class QmAppointmentTitleComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  titleInput$: Subject<string> = new Subject<string>();
  title$: Observable<string>;

  private title: string;

  constructor(
    private appointmentMetaSelectors: AppointmentMetaSelectors,
    private appointmentMetaDispatchers: AppointmentMetaDispatchers
  ) {
    this.title$ = this.appointmentMetaSelectors.title$;
  }

  ngOnInit() {
    const titleInputSubscription = this.titleInput$.subscribe(
      (title: string) => this.setTitle(title)
    );

    this.subscriptions.add(titleInputSubscription);
  }

  updateTitle(title: string) {
    this.titleInput$.next(title);
  }

  setTitle(title: string) {
    this.appointmentMetaDispatchers.setAppointmentTitle(title);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}

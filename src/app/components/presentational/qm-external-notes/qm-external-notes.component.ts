import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject ,  Observable ,  Subscription } from 'rxjs';

import {
  UserSelectors,
  AppointmentMetaSelectors,
  AppointmentMetaDispatchers,
  SettingsAdminSelectors,
  AppointmentSelectors
} from '../../../../store';
import { Setting } from '../../../../models/Setting';
import { AutoClose } from '../../../../services/util/autoclose.service';
import { IAppointment } from '../../../../models/IAppointment';

@Component({
  selector: 'qm-external-notes',
  templateUrl: './qm-external-notes.component.html',
  styleUrls: ['./qm-external-notes.component.scss']
})
export class QmExternalNotesComponent implements OnInit {
  private subscriptions: Subscription = new Subscription();
  private externalnotesInput$: Subject<string> = new Subject<string>();
  private externalnotesLength$: Observable<number>;
  public userDirection$: Observable<string>;
  private externalNotes$: Observable<string>;
  private settingsMap$: Observable<{ [name: string]: Setting }>;
  private selectedAppointment$: Observable<IAppointment>;
  private notes: string;
  public externalNotesLength: number;
  public extrnalNotesMaxLength = 255;
  public notesInputOpened = false;
  private buttonPlaceholderText: string;
  externalNotesEnabled: boolean;

  constructor(
    private userSelectors: UserSelectors,
    private appointmentMetaSelectors: AppointmentMetaSelectors,
    private appointmentMetaDispatchers: AppointmentMetaDispatchers,
    private translateService: TranslateService,
    private appointmentSelectors: AppointmentSelectors,
    private settingsAdminSelectors: SettingsAdminSelectors,
    public autoCloseService: AutoClose
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.externalnotesLength$ = this.appointmentMetaSelectors.externalnotesLength$;
    this.externalNotes$ = this.appointmentMetaSelectors.externalNotes$;
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
    this.selectedAppointment$ = this.appointmentSelectors.selectedAppointment$;
  }

  ngOnInit() {
    const externalNotesInputSubscription = this.externalnotesInput$.subscribe(
      (note: string) => this.setNote(note)
    );


    const selectedAppointmentSubscription = this.selectedAppointment$.subscribe(
      (appointment: IAppointment) => {

        if ( appointment && appointment.custom && JSON.parse(appointment.custom.toString()).infoToCustomer) {
          console.log(JSON.parse(appointment.custom.toString()));
          this.appointmentMetaDispatchers.setExternalNote(JSON.parse(appointment.custom.toString()).infoToCustomer)
        }
       
      }
    );

    const settingsMapSubscription = this.settingsMap$.subscribe(
      (settingsMap: { [name: string]: Setting }) =>
        (this.externalNotesEnabled = settingsMap.externalnotes.value)
    );

    const externalNotesSubscription = this.externalNotes$.subscribe(
      (notes: string) => (this.notes = notes)
    );

    const externalNotesLengthSubscription = this.externalnotesLength$.subscribe(
      (notesLength: number) => (this.externalNotesLength = notesLength) 
    );

    const buttonLabelSubscription = this.translateService
      .get('label.external.notes.presentational.placeholder')
      .subscribe(
        (buttonPlaceholderText: string) =>
          (this.buttonPlaceholderText = buttonPlaceholderText)
      );

    const langChangeSubscription = this.translateService.onLangChange.subscribe(
      () => {
        this.translateService
          .get('label.external.notes.presentational.placeholder')
          .subscribe(
            (buttonPlaceholderText: string) =>
              (this.buttonPlaceholderText = buttonPlaceholderText)
          ).unsubscribe();
      }
    );

    this.subscriptions.add(externalNotesInputSubscription);
    this.subscriptions.add(settingsMapSubscription);
    this.subscriptions.add(externalNotesLengthSubscription);
    this.subscriptions.add(externalNotesSubscription);
    this.subscriptions.add(buttonLabelSubscription);
    this.subscriptions.add(langChangeSubscription);
    this.subscriptions.add(selectedAppointmentSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  handleNotesInput(note: string) {
    this.externalnotesInput$.next(note);
  }

  setNote(note: string) {
    this.appointmentMetaDispatchers.setExternalNote(`${note}`);
  }

  hasNotesText() {
    return this.notes.trim().length !== 0;
  }

  getButtonText() {
    return this.hasNotesText()
      ? this.notes.split('\n').join('<br />')
      : this.buttonPlaceholderText;
  }

  hideNotesInput() {
    this.notesInputOpened = false;
  }

  toggleNotesInput() {
    this.notesInputOpened = !this.notesInputOpened;
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject ,  Observable ,  Subscription } from 'rxjs';

import {
  UserSelectors,
  AppointmentMetaSelectors,
  AppointmentMetaDispatchers,
  SettingsAdminSelectors
} from '../../../../store';
import { Setting } from '../../../../models/Setting';
import { AutoClose } from '../../../../services/util/autoclose.service';

@Component({
  selector: 'qm-notes',
  templateUrl: './qm-notes.component.html',
  styleUrls: ['./qm-notes.component.scss']
})
export class QmNotesComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private notesInput$: Subject<string> = new Subject<string>();
  private notesLength$: Observable<number>;
  public userDirection$: Observable<string>;
  private notes$: Observable<string>;
  private settingsMap$: Observable<{ [name: string]: Setting }>;

  private notes: string;
  public notesLength: number;
  public notesMaxLength = 255;
  public notesInputOpened = false;
  private buttonPlaceholderText: string;
  notesEnabled: boolean;

  constructor(
    private userSelectors: UserSelectors,
    private appointmentMetaSelectors: AppointmentMetaSelectors,
    private appointmentMetaDispatchers: AppointmentMetaDispatchers,
    private translateService: TranslateService,
    private settingsAdminSelectors: SettingsAdminSelectors,
    public autoCloseService: AutoClose
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.notesLength$ = this.appointmentMetaSelectors.notesLength$;
    this.notes$ = this.appointmentMetaSelectors.notes$;
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
  }

  ngOnInit() {
    const notesInputSubscription = this.notesInput$.subscribe(
      (note: string) => this.setNote(note)
    );

    const settingsMapSubscription = this.settingsMap$.subscribe(
      (settingsMap: { [name: string]: Setting }) =>
        (this.notesEnabled = settingsMap.Notes.value)
    );

    const notesSubscription = this.notes$.subscribe(
      (notes: string) => {
        this.notes = notes
        if (this.notes) {
          var decodeString;
          try {
            decodeString = decodeURIComponent(this.notes ? this.notes : '');
          } catch (e) {
            decodeString = notes;
          }
          this.notes =  decodeString;
        } 
      }
    );

    const notesLengthSubscription = this.notesLength$.subscribe(
      (notesLength: number) => (this.notesLength = notesLength)
    );

    const buttonLabelSubscription = this.translateService
      .get('label.notes.presentational.placeholder')
      .subscribe(
        (buttonPlaceholderText: string) =>
          (this.buttonPlaceholderText = buttonPlaceholderText)
      );

    const langChangeSubscription = this.translateService.onLangChange.subscribe(
      () => {
        this.translateService
          .get('label.notes.presentational.placeholder')
          .subscribe(
            (buttonPlaceholderText: string) =>
              (this.buttonPlaceholderText = buttonPlaceholderText)
          ).unsubscribe();
      }
    );

    this.subscriptions.add(notesInputSubscription);
    this.subscriptions.add(settingsMapSubscription);
    this.subscriptions.add(notesLengthSubscription);
    this.subscriptions.add(notesSubscription);
    this.subscriptions.add(buttonLabelSubscription);
    this.subscriptions.add(langChangeSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  handleNotesInput(note: string) {
    this.notesInput$.next(encodeURIComponent(note));
  }

  setNote(note: string) {
    this.appointmentMetaDispatchers.setAppointmentNote(`${note}`);
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

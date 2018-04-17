import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { distinctUntilChanged } from 'rxjs/operators';
import { UserSelectors, BookingDispatchers, BookingSelectors } from '../../../../store';


@Component({
  selector: 'qm-notes',
  templateUrl: './qm-notes.component.html',
  styleUrls: ['./qm-notes.component.scss']
})
export class QmNotesComponent implements OnInit {
  @Input() private notesText: string;

  private subscriptions: Subscription = new Subscription();
  private notesInput$: Subject<string> = new Subject<string>();
  private characterCount$: Observable<number>;
  private userDirection$: Observable<string>;
  private notes$: Observable<string>;
  private characterCount: number;

  private notesInputOpened = false;

  constructor(
    private userSelectors: UserSelectors,
    private bookingSelectors: BookingSelectors,
    private bookingDispatchers: BookingDispatchers
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.characterCount$ = this.bookingSelectors.bookingNotesLength$;
    this.notes$ = this.bookingSelectors.bookingNotes$;
  }

  ngOnInit() {
    const notesInputSubscription = this.notesInput$.pipe(
      distinctUntilChanged(),
    ).subscribe(text => this.handleNotesInput(text));

    const characterCountSubscription = this.characterCount$.subscribe(
      (characterCount: number) =>
        this.characterCount = characterCount
    );

    this.subscriptions.add(notesInputSubscription);
    this.subscriptions.add(characterCountSubscription);
  }

  handleNotesInput(text) {
    this.bookingDispatchers.setBookingNote(text);
  }

  toggleNotesInput() {
    this.notesInputOpened = !this.notesInputOpened;
  }
}

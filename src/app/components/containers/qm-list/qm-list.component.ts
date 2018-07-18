import { AutoClose } from './../../../../services/util/autoclose.service';
import {
  Component,
  OnInit,
  Input,
  Output,
  OnDestroy,
  ElementRef,
} from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { IAppointment } from '../../../../models/IAppointment';

@Component({
  selector: 'qm-list',
  templateUrl: './qm-list.component.html',
  styleUrls: ['./qm-list.component.scss'],
})
export class QmListComponent implements OnInit, OnDestroy {
  @Input() userDirection: string;

  @Input() searchable = true;

  @Input() header: string;

  @Input() placeholder: string;

  @Input() subheader: string;

  @Input() searchText: string;

  @Input() displayAsRequired = true;

  @Input() sidebarEnabled = false;

  @Input() scrollToTopOnBooking = false;

  @Input() bookedAppointment: Observable<IAppointment> = null;

  @Input() itemToScrollTo$: Observable<number> = undefined;

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  @Output() sidebar: EventEmitter<string> = new EventEmitter<string>();

  private subscriptions: Subscription = new Subscription();
  private searchInput$: Subject<string> = new Subject<string>();
  public uniqueId: string;

  constructor(private elRef: ElementRef, public autoCloseService: AutoClose) {}

  ngOnInit() {
    this.setUniqueId();

    if (this.searchable === true) {
      const searchInputSubscription = this.searchInput$
        .subscribe((text: string) => {
          this.search.emit(text);
        });

      this.subscriptions.add(searchInputSubscription);
    }
    if (this.scrollToTopOnBooking === true || this.sidebarEnabled === true) {
      const bookingList = this.elRef.nativeElement.querySelector(
        '.qm-booking__list'
      );

      if (this.scrollToTopOnBooking === true) {
        const bookedAppointmentSubscription = this.bookedAppointment.subscribe(() => {
          bookingList.scrollTop = 0;
        });

        this.subscriptions.add(bookedAppointmentSubscription);
      }

      if (this.sidebarEnabled === true) {
        if (this.itemToScrollTo$) {
          const scrollTimeSubscription = this.itemToScrollTo$.subscribe(
            (index: number) => {
              if (index !== -1) {
                const itemToScrollTo = bookingList.children[index];

                if (itemToScrollTo !== undefined) {
                  itemToScrollTo.scrollIntoView(true);
                }
              }
            }
          );

          this.subscriptions.add(scrollTimeSubscription);
        }
      }
    }
  }

  setUniqueId() {
    this.uniqueId = this.generateId();
  }

  generateId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  handleSidebarClick(timeToScrollTo: string) {
    this.sidebar.emit(timeToScrollTo);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  filter(text: string) {
    this.searchInput$.next(text);
  }
}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmBookingHistoryComponent } from './qm-booking-history.component';

describe('QmBookingHistoryComponent', () => {
  let component: QmBookingHistoryComponent;
  let fixture: ComponentFixture<QmBookingHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmBookingHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmBookingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

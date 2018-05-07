import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmBookingFooterComponent } from './qm-booking-footer.component';

describe('QmBookingFooterComponent', () => {
  let component: QmBookingFooterComponent;
  let fixture: ComponentFixture<QmBookingFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmBookingFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmBookingFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

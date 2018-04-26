import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmBookingFlowComponent } from './qm-booking-flow.component';

describe('QmBookingFlowComponent', () => {
  let component: QmBookingFlowComponent;
  let fixture: ComponentFixture<QmBookingFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmBookingFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmBookingFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmAppointmentCardComponent } from './qm-appointment-card.component';

describe('QmAppointmentCardComponent', () => {
  let component: QmAppointmentCardComponent;
  let fixture: ComponentFixture<QmAppointmentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmAppointmentCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmAppointmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

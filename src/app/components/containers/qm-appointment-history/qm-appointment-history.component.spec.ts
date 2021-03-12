import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QmAppointmentHistoryComponent } from './qm-appointment-history.component';

describe('QmAppointmentHistoryComponent', () => {
  let component: QmAppointmentHistoryComponent;
  let fixture: ComponentFixture<QmAppointmentHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QmAppointmentHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QmAppointmentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

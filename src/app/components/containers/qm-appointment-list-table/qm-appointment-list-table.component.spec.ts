import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QmAppointmentListTableComponent } from './qm-appointment-list-table.component';

describe('QmAppointmentListTableComponent', () => {
  let component: QmAppointmentListTableComponent;
  let fixture: ComponentFixture<QmAppointmentListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QmAppointmentListTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QmAppointmentListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

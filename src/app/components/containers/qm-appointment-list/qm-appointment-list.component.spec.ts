import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QmAppointmentListComponent } from './qm-appointment-list.component';

describe('QmAppointmentListComponent', () => {
  let component: QmAppointmentListComponent;
  let fixture: ComponentFixture<QmAppointmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QmAppointmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QmAppointmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

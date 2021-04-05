import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QmAppointmentListDashboardComponent } from './qm-appointment-list-dashboard.component';

describe('QmAppointmentListDashboardComponent', () => {
  let component: QmAppointmentListDashboardComponent;
  let fixture: ComponentFixture<QmAppointmentListDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QmAppointmentListDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QmAppointmentListDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

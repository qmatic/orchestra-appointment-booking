import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QmAppointmentListSettingsComponent } from './qm-appointment-list-settings.component';

describe('QmAppointmentListSettingsComponent', () => {
  let component: QmAppointmentListSettingsComponent;
  let fixture: ComponentFixture<QmAppointmentListSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QmAppointmentListSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QmAppointmentListSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

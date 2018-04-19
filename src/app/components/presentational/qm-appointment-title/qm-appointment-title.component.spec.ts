import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmAppointmentTitleComponent } from './qm-appointment-title.component';

describe('QmAppointmentTitleComponent', () => {
  let component: QmAppointmentTitleComponent;
  let fixture: ComponentFixture<QmAppointmentTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmAppointmentTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmAppointmentTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
